<?php

namespace App\Http\Controllers;

use App\Http\Requests\OfficeRequest;
use App\Models\Office;
use App\Services\OfficeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfficeController extends Controller
{
    protected $officeService;
    public function __construct(OfficeService $officeService)
    {
        $this->officeService = $officeService;
    }

    public function index()
    {
        $offices = $this->officeService->index();
        return Inertia::render('office/page', [
            'offices' => $offices,
        ]);
    }

    public function create()
    {
        return Inertia::render(
            'office/create'
        );
    }

    public function store(OfficeRequest $request)
    {
        $this->officeService->store($request->validated());
        return to_route('office.index')->with('success', 'New Office created successfully.');
    }

    public function edit(Office $office)
    {
        return Inertia::render('office/edit', [
            'office' => $office,
        ]);
    }

    public function update(OfficeRequest $request, Office $office)
    {
        $office = $this->officeService->update(
            $office,
            $request->validated()
        );

        return to_route('office.index')
            ->with('success', 'office Successfully updated');
    }

    public function destroy(Office $office)
    {
        $this->officeService->delete($office);

        return to_route('office.index')
            ->with('success', 'Office succesfully deleted');
    }
}
