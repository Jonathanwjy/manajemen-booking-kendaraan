<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleTypeRequest;
use App\Models\VehicleType;
use App\Services\VehicleTypeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleTypeController extends Controller
{
    protected $vehicleTypeService;

    public function __construct(VehicleTypeService $vehicleTypeService)
    {
        $this->vehicleTypeService = $vehicleTypeService;
    }

    public function index()
    {
        $vehicle_types = $this->vehicleTypeService->index();
        return Inertia::render('vehicle/page', [
            'vehicle_types' => $vehicle_types,
        ]);
    }

    public function create()
    {
        return Inertia::render(
            'vehicle_management/vehicle_type/create'
        );
    }

    public function store(VehicleTypeRequest $request)
    {
        $this->vehicleTypeService->store($request->validated());
        return to_route('vehicle.index')->with('success', 'New Vehicle Type created successfully.');
    }

    public function edit(VehicleType $vehicleType)
    {
        return Inertia::render('vehicle_management/vehicle_type/edit', [
            'vehicle_type' => $vehicleType,
        ]);
    }

    public function update(VehicleTypeRequest $request, VehicleType $vehicleType)
    {
        $vehicleType = $this->vehicleTypeService->update(
            $vehicleType,
            $request->validated()
        );

        return to_route('vehicle.index')
            ->with('success', 'Vehicle Type Successfully updated');
    }

    public function destroy(VehicleType $vehicleType)
    {
        $this->vehicleTypeService->delete($vehicleType);

        return to_route('vehicle.index')
            ->with('success', 'Vehicle Type succesfully deleted');
    }
}
