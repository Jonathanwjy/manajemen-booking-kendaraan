<?php

namespace App\Services;

use App\Models\VehicleType;
use Illuminate\Support\Facades\DB;

class VehicleTypeService
{
    public function index()
    {
        return VehicleType::orderBy('created_at', 'asc')->paginate(10);
    }
    public function store(array $data): VehicleType
    {
        return DB::transaction(function () use ($data) {
            return VehicleType::create($data);
        });
    }

    public function update(VehicleType $vehicleType, array $data): VehicleType
    {
        return DB::transaction(function () use ($vehicleType, $data) {
            $vehicleType->update($data);
            return $vehicleType->fresh();
        });
    }

    public function delete(VehicleType $vehicleType): bool
    {
        return $vehicleType->delete();
    }
}
