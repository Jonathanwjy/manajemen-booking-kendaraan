<?php

namespace App\Services;

use App\Models\Service;
use App\Models\Vehicle;
use Illuminate\Support\Facades\DB;

class ServiceService
{
    public function index(?string $search = null)
    {
        return Service::with('Vehicle')
            ->when($search, function ($query) use ($search) {
                $search = strtolower($search);

                $query->whereHas('vehicle', function ($q) use ($search) {
                    $q->whereRaw('LOWER(registration_number) LIKE ?', ["%{$search}%"]);
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

    public function create(): array
    {
        return [
            'vehicles' => Vehicle::select('id', 'registration_number')
                ->latest()
                ->get(),
        ];
    }

    public function store(array $data): Service
    {
        return DB::transaction(function () use ($data) {
            $service = Service::create($data);
            Vehicle::where('id', $data['vehicle_id'])
                ->update(['status' => 'service']);

            return $service;
        });
    }

    public function show(Service $service): Service
    {
        return $service->load('vehicle');
    }

    public function edit(Service $service): array
    {
        return [
            'service' => $service->load('vehicle'),
            'vehicles' => Vehicle::select('id', 'plate_number')
                ->orderBy('registration_number')
                ->get(),
        ];
    }

    public function update(Service $service, array $data): Service
    {
        return DB::transaction(function () use ($service, $data) {
            $service->update($data);

            return $service->fresh();
        });
    }

    public function finish(Service $service, array $data): Service
    {
        return DB::transaction(function () use ($service, $data) {
            $service->update([
                'next_service_date'     => $data['next_service_date'],
                'next_service_odometer' => $data['next_service_odometer'],
                'status'                => 'finished',
            ]);

            Vehicle::where('id', $service->vehicle_id)
                ->update(['status' => 'available']);

            return $service->fresh();
        });
    }

    public function destroy(Service $service): void
    {
        DB::transaction(function () use ($service) {
            if ($service->status === 'service') {
                Vehicle::where('id', $service->vehicle_id)
                    ->update(['status' => 'available']);
            }

            $service->delete();
        });
    }
}
