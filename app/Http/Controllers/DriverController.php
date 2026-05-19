<?php

namespace App\Http\Controllers;

use App\Http\Requests\DriverRequest;
use App\Models\Driver;
use App\Models\Office;
use App\Services\DriverService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $driverService;
    public function __construct(DriverService $driverService)
    {
        $this->driverService = $driverService;
    }
    public function index(Request $request)
    {
        return Inertia::render('driver/page', [
            'drivers' => $this->driverService->index($request->search),
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = $this->driverService->create();
        return Inertia::render("driver/create", $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DriverRequest $request)
    {
        $this->driverService->store($request->validated());
        return to_route('driver.index')->with('success', 'New Driver created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Driver $driver)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Driver $driver)
    {
        $data = $this->driverService->edit($driver);
        return Inertia::render("driver/edit", [
            "driver" => $data['driver'],
            "offices" => $data['offices']
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DriverRequest $request, Driver $driver)
    {
        $driver = $this->driverService->update(
            $driver,
            $request->validated()
        );

        return to_route('driver.index')
            ->with('success', 'driver Successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        $this->driverService->delete($driver);

        return to_route('driver.index')
            ->with('success', 'Driver succesfully deleted');
    }
}
