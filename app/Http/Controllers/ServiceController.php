<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use App\Models\Vehicle;
use App\Services\ServiceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    protected $serviceService;
    public function __construct(ServiceService $serviceService)
    {
        $this->serviceService = $serviceService;
    }
    public function index()
    {
        return Inertia::render('service/page', [
            'services' => $this->serviceService->index(
                request('search')
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('service/create', [
            'vehicles' => Vehicle::all(),
        ]);
    }

    public function store(ServiceRequest $request)
    {
        $this->serviceService->store(
            $request->validated()
        );

        return to_route('service.index')
            ->with('success', 'Service berhasil ditambahkan');
    }

    public function show(Service $service)
    {
        return Inertia::render('service/show', [
            'service' => $this->serviceService->show($service),
        ]);
    }

    public function edit(Service $service)
    {
        return Inertia::render('service/edit', [
            'service' => $service,
            'vehicles' => Vehicle::all(),
        ]);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $this->serviceService->update(
            $service,
            $request->validated()
        );

        return to_route('service.index')
            ->with('success', 'Service berhasil diupdate');
    }

    public function finish(Service $service, Request $request): RedirectResponse
    {
        $data = $request->validate([
            'next_service_date'     => 'required|date|after_or_equal:' . $service->service_date,
            'next_service_odometer' => 'required|integer|gte:' . $service->odometer,
        ]);

        $this->serviceService->finish($service, $data);

        return redirect()->route('service.index')->with('success', 'Service berhasil diselesaikan.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $this->serviceService->destroy($service);

        return redirect()->route('service.index')->with('success', 'Service berhasil dihapus.');
    }
}
