<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleRequest;
use App\Models\Vehicle;
use App\Services\VehicleService;
use App\Services\VehicleTypeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{

    public function __construct(
        protected VehicleService $vehicleService,
        protected VehicleTypeService $vehicleTypeService,
    ) {}
    public function index(Request $request)
    {
        return Inertia::render('vehicle_management/page', [
            'vehicles' => $this->vehicleService
                ->index($request->search),

            'vehicleTypes' => $this->vehicleTypeService
                ->index(),

            'filters' => [
                'search' => $request->search,
                'tab' => $request->tab,
            ],
        ]);
    }

    public function create()
    {
        $data = $this->vehicleService->create();
        return Inertia::render('vehicle_management/vehicle/create', $data);
    }

    public function store(VehicleRequest $request)
    {
        $this->vehicleService->store($request->validated());
        return to_route('vehicle.index')->with('success', 'New vehicle created successfully.');
    }

    public function edit(Vehicle $vehicle)
    {
        $data = $this->vehicleService->edit($vehicle);
        return Inertia::render('vehicle_management/vehicle/edit', $data);
    }

    public function update(VehicleRequest $request, Vehicle $vehicle)
    {
        $vehicle = $this->vehicleService->update(
            $vehicle,
            $request->validated()
        );

        return to_route('vehicle.index')
            ->with('success', '$vehicle Successfully updated');
    }

    public function show(Vehicle $vehicle)
    {
        // 1. Kita tarik relasinya langsung di sini (Bypass VehicleService sementara)
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

        // 2. Langsung kirim raw model $vehicle ke Inertia
        return Inertia::render('vehicle_management/vehicle/show', [
            'vehicle' => $vehicle
        ]);
    }

    public function destroy(Vehicle $vehicle)
    {
        $this->vehicleService->delete($vehicle);

        return to_route('vehicle.index')
            ->with('success', 'Vehicle succesfully deleted');
    }
}
