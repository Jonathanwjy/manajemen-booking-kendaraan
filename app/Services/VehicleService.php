<?php

namespace App\Services;

use App\Models\Office;
use App\Models\Vehicle;
use App\Models\VehicleType;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VehicleService
{
    public function index(?string $search = null)
    {
        return Vehicle::with([
            'office',
            'vehicleType',
        ])
            ->when($search, function ($query) use ($search) {
                $search = strtolower($search);

                $query->whereRaw(
                    'LOWER(model) LIKE ?',
                    ["%{$search}%"]
                )
                    ->orWhereRaw(
                        'LOWER(registration_number) LIKE ?',
                        ["%{$search}%"]
                    )
                    ->orWhereHas('office', function ($q) use ($search) {
                        $q->whereRaw(
                            'LOWER(name) LIKE ?',
                            ["%{$search}%"]
                        );
                    });
            })
            ->orderBy('status')
            ->paginate(10)
            ->withQueryString();
    }

    public function create()
    {
        return [
            'offices' =>  Office::select('id', 'name')
                ->orderBy('name')
                ->get(),
            'vehicle_types' => VehicleType::get()->all(),
        ];
    }


    public function store(array $data): Vehicle
    {
        return DB::transaction(function () use ($data) {
            return Vehicle::create($data);
        });
    }

    public function edit(Vehicle $vehicle): array
    {
        return [
            'vehicle' => $vehicle,
            'vehicle_types' => VehicleType::get()->all(),
            'offices' => Office::select('id', 'name')
                ->orderBy('name')
                ->get(),
        ];
    }

    public function update(Vehicle $vehicle, array $data): Vehicle
    {
        return DB::transaction(function () use ($vehicle, $data) {
            $vehicle->update($data);
            return $vehicle->fresh();
        });
    }

    public function delete(Vehicle $vehicle): bool
    {
        return $vehicle->delete();
    }

    public function show(Vehicle $vehicle)
    {
        // Eager load relasi beserta urutan terbarunya
        $vehicle->load([
            'office',
            'vehicleType',
            'VehicleUsage' => function ($query) {
                $query->with('driver')->orderBy('created_at', 'desc');
            },
            'Service' => function ($query) {
                $query->orderBy('service_date', 'desc');
            }
        ]);

        return Inertia::render('vehicle_management/vehicle/show', [
            'vehicle' => $vehicle
        ]);
    }
}
