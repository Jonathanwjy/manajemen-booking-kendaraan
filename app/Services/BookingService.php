<?php

namespace App\Services;

use App\Exports\BookingsExport;
use App\Models\Booking;
use App\Models\Driver;
use App\Models\Office;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleUsage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;


class BookingService
{
    private function generateBookingCode(int $officeId): string
    {
        $prefix = 'BKG-OFC' . $officeId . '-' . date('Ym') . '-';

        do {
            $code = $prefix . strtoupper(Str::random(4));
        } while (Booking::where('booking_code', $code)->exists());

        return $code;
    }

    public function getIndexData(?string $search, ?string $startDate, ?string $endDate)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return $this->getAllBookings($search, $startDate, $endDate);
        }

        return $this->getBookingsForApprover($search, $user->id, $startDate, $endDate);
    }
    private function getAllBookings($search, $startDate, $endDate)
    {
        return Booking::with(['vehicle', 'driver', 'office', 'BookingApproval'])
            ->when($search, fn($q, $s) => $q->where('booking_code', 'ilike', "%{$s}%"))
            ->when($startDate, fn($q, $date) => $q->whereDate('start_date', '>=', $date))
            ->when($endDate, fn($q, $date) => $q->whereDate('end_date', '<=', $date))
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

    // 3. UPDATE: Tambahkan filter when() untuk tanggal
    private function getBookingsForApprover($search, $userId, $startDate, $endDate)
    {
        return Booking::whereHas('BookingApproval', function ($query) use ($userId) {
            $query->where('approver_id', $userId);
        })
            ->with(['vehicle', 'driver', 'office', 'BookingApproval'])
            ->when($search, fn($q, $s) => $q->where('booking_code', 'ilike', "%{$s}%"))
            ->when($startDate, fn($q, $date) => $q->whereDate('start_date', '>=', $date))
            ->when($endDate, fn($q, $date) => $q->whereDate('end_date', '<=', $date))
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

    public function exportExcel(?string $search, ?string $startDate, ?string $endDate)
    {
        $user = Auth::user();
        $fileName = 'laporan-booking-' . date('Y-m-d') . '.xlsx';

        return Excel::download(
            new BookingsExport($search, $startDate, $endDate, $user),
            $fileName
        );
    }

    public function create(): array
    {
        return [
            'offices'  => Office::all(),
            'vehicles' => Vehicle::where('status', 'available')->get(),
            'drivers'  => Driver::where('status', 'available')->get(),
            'users'    => User::where('role', 'approval')->get(),
        ];
    }
    public function store(array $data): Booking
    {
        if (empty($data['approver_ids']) || !is_array($data['approver_ids']) || count($data['approver_ids']) < 2) {
            throw new \Exception('Minimal harus memilih 2 approver untuk membuat booking.');
        }
        if (empty($data['booking_code'])) {
            $data['booking_code'] = $this->generateBookingCode($data['office_id']);
        }

        $data['status'] = $data['status'] ?? 'pending';

        return DB::transaction(function () use ($data) {

            $vehicle = Vehicle::findOrFail($data['vehicle_id']);
            $driver  = Driver::findOrFail($data['driver_id']);

            if ($vehicle->status !== 'available') {
                throw new \Exception('Kendaraan sedang tidak tersedia.');
            }

            if ($driver->status !== 'available') {
                throw new \Exception('Driver sedang tidak tersedia.');
            }

            $booking = Booking::create($data);

            $vehicle->update(['status' => 'booked']);
            $driver->update(['status' => 'unavailable']);

            if (!empty($data['approver_ids'])) {
                $approvals = array_map(fn($id) => [
                    'approver_id' => $id,
                    'status'      => 'pending',
                ], $data['approver_ids']);

                $booking->BookingApproval()->createMany($approvals);
            }

            return $booking;
        });
    }

    public function edit(Booking $booking): array
    {
        return [
            'offices'  => Office::all(),
            'vehicles' => Vehicle::where('status', 'available')
                ->orWhere('id', $booking->vehicle_id)
                ->get(),
            'drivers'  => Driver::where('status', 'available')
                ->orWhere('id', $booking->driver_id)
                ->get(),
            'users'    => User::where('role', 'approval')->get(),
            'booking'  => $booking->load('BookingApproval'),
        ];
    }

    public function update(Booking $booking, array $data): Booking
    {
        if (array_key_exists('approver_ids', $data)) {
            if (empty($data['approver_ids']) || !is_array($data['approver_ids']) || count($data['approver_ids']) < 2) {
                throw new \Exception('Minimal harus memilih 2 approver untuk mengupdate booking.');
            }
        }
        return DB::transaction(function () use ($booking, $data) {

            $newVehicleId = $data['vehicle_id'] ?? $booking->vehicle_id;
            $newDriverId  = $data['driver_id']  ?? $booking->driver_id;

            $vehicleChanged = $newVehicleId != $booking->vehicle_id;
            $driverChanged  = $newDriverId  != $booking->driver_id;

            if ($vehicleChanged) {
                $newVehicle = Vehicle::findOrFail($newVehicleId);

                if ($newVehicle->status !== 'available') {
                    throw new \Exception('Kendaraan baru sedang tidak tersedia.');
                }

                Vehicle::where('id', $booking->vehicle_id)->update(['status' => 'available']);
                $newVehicle->update(['status' => 'booked']);
            }

            if ($driverChanged) {
                $newDriver = Driver::findOrFail($newDriverId);

                if ($newDriver->status !== 'available') {
                    throw new \Exception('Driver baru sedang tidak tersedia.');
                }

                Driver::where('id', $booking->driver_id)->update(['status' => 'available']);
                $newDriver->update(['status' => 'unavailable']);
            }

            $booking->update($data);

            $newApproverIds     = $data['approver_ids'] ?? [];
            $currentApproverIds = $booking->BookingApproval()->pluck('approver_id')->toArray();

            $toAdd    = array_diff($newApproverIds, $currentApproverIds);
            $toRemove = array_diff($currentApproverIds, $newApproverIds);

            if (!empty($toRemove)) {
                $booking->BookingApproval()->whereIn('approver_id', $toRemove)->delete();
            }

            if (!empty($toAdd)) {
                $approvals = array_map(fn($id) => [
                    'approver_id' => $id,
                    'status'      => 'pending',
                ], $toAdd);

                $booking->BookingApproval()->createMany($approvals);
            }

            return $booking;
        });
    }
    public function show(Booking $booking): Booking
    {
        return $booking->load(['Vehicle', 'Driver', 'Office', 'BookingApproval' => function ($query) {
            $query->with('User');
        }]);
    }

    public function approveBooking(Booking $booking, int $approverId, string $status)
    {
        return DB::transaction(function () use ($booking, $approverId, $status) {

            $booking->BookingApproval()
                ->where('approver_id', $approverId)
                ->update(['status' => $status]);

            if ($status === 'declined') {
                $booking->update(['status' => 'declined']);

                // ✅ Tambahkan ini — bebaskan vehicle & driver
                Vehicle::where('id', $booking->vehicle_id)->update(['status' => 'available']);
                Driver::where('id', $booking->driver_id)->update(['status' => 'available']);

                return $booking;
            }

            $totalApprovals    = $booking->BookingApproval()->count();
            $acceptedApprovals = $booking->BookingApproval()->where('status', 'accepted')->count();

            if ($totalApprovals > 0 && $totalApprovals === $acceptedApprovals) {
                $booking->update(['status' => 'ongoing']);
            }

            return $booking;
        });
    }

    public function completeBooking(Booking $booking, array $data): Booking
    {
        return DB::transaction(function () use ($booking, $data) {
            // 1. Simpan data pemakaian
            VehicleUsage::create([
                'booking_id'     => $booking->id,
                'vehicle_id'     => $booking->vehicle_id,
                'driver_id'      => $booking->driver_id,
                'start_odometer' => $data['start_odometer'],
                'end_odometer'   => $data['end_odometer'],
                'fuel_used'      => $data['fuel_used'],
            ]);

            // 2. Update status Booking
            $booking->update(['status' => 'finished']);

            // 3. Update ketersediaan Kendaraan & Odometer terbaru
            Vehicle::where('id', $booking->vehicle_id)->update([
                'status'   => 'available',
                'odometer' => $data['end_odometer']
            ]);

            // 4. Update ketersediaan Driver
            Driver::where('id', $booking->driver_id)->update(['status' => 'available']);

            return $booking;
        });
    }
}
