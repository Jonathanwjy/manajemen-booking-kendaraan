<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingRequest;
use App\Http\Requests\VehicleUsageRequest;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Database\Eloquent\Casts\AsUri;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    protected $bookingService;

    // Inject BookingService ke dalam Controller
    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    // Method Index di Controller
    public function index(Request $request, BookingService $service)
    {
        $search = $request->query('search');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $isAdmin = Auth::user()->role === 'admin';
        $bookings = $service->getIndexData($search, $startDate, $endDate);

        return inertia('booking/page', [
            'bookings' => $bookings,
            'filters'  => request()->only(['search', 'start_date', 'end_date']),
            'isAdmin'  => $isAdmin,
        ]);
    }

    public function export(Request $request, BookingService $service)
    {
        $search = $request->query('search');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        return $service->exportExcel($search, $startDate, $endDate);
    }

    public function create()
    {
        return Inertia::render('booking/create', $this->bookingService->create());
    }

    public function store(BookingRequest $request)
    {
        $this->bookingService->store($request->validated());
        return to_route('booking.index')->with('success', "New Book Successfully Added");
    }

    public function edit(Booking $booking)
    {
        $data = $this->bookingService->edit($booking);
        return Inertia::render('booking/edit', $data);
    }

    public function update(BookingRequest $request, Booking $booking)
    {
        $this->bookingService->update($booking, $request->validated());
        return to_route('booking.index')->with('success', "Booking Successfully Updated");
    }

    public function show(Booking $booking)
    {
        $bookingDetail = $this->bookingService->show($booking);

        $isApprover = $bookingDetail->BookingApproval()
            ->where('approver_id', Auth::user()->id)
            ->exists();

        return Inertia::render('booking/show', [
            'booking' => $bookingDetail,
            'isApprover' => $isApprover
        ]);
    }

    public function approve(Request $request, Booking $booking)
    {

        $this->bookingService->approveBooking(
            $booking,
            Auth::user()->id,
            $request->status
        );

        return back()->with('success', 'Booking status updated successfully.');
    }

    public function completeBooking(VehicleUsageRequest $request, Booking $booking): RedirectResponse
    {
        $validatedData = $request->validated();

        $this->bookingService->completeBooking($booking, $validatedData);

        return back()->with('success', 'Booking berhasil diselesaikan dan data pemakaian dicatat.');
    }
}
