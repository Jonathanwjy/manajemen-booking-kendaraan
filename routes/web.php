<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleTypeController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\ApprovalMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('office', OfficeController::class);
    Route::resource('driver', DriverController::class);
    Route::resource('vehicle', VehicleController::class);
    Route::resource('vehicle-type', VehicleTypeController::class);
    Route::resource('service', ServiceController::class);
    Route::patch('/service/{service}/finish', [ServiceController::class, 'finish']);
    Route::get('/booking/export', [BookingController::class, 'export'])->name('booking.export');
});


Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('booking/create', [BookingController::class, 'create'])->name('booking.create');

    Route::get('booking/{booking}/edit', [BookingController::class, 'edit'])
        ->name('booking.edit')
        ->whereNumber('booking');

    Route::post('booking/{booking}/complete', [BookingController::class, 'completeBooking'])
        ->name('booking.complete')
        ->whereNumber('booking');
});

Route::middleware(['auth'])->group(function () {
    // Karena diletakkan di bawah, /booking/create tidak akan tertangkap oleh route show dari resource ini
    Route::resource('booking', BookingController::class)->except('create', 'edit');
});

Route::middleware(['auth', ApprovalMiddleware::class])->group(function () {
    Route::patch('/booking/{booking}/approve', [BookingController::class, 'approve'])
        ->whereNumber('booking'); // Tambahkan whereNumber agar lebih aman
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
