<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\Office;
use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jkt1 = Office::where('name', 'DKI Jakarta 1')->first()->id;
        $jkt2 = Office::where('name', 'DKI Jakarta 2')->first()->id;

        $driverAya = Driver::where('name', 'aya')->first()->id;
        $driverNathan = Driver::where('name', 'nathan')->first()->id;
        $driverJo = Driver::where('name', 'Jo')->first()->id;

        $vehicleJkt2Avanza = Vehicle::where('registration_number', 'BG 1111 AV')->first()->id ?? Vehicle::where('office_id', $jkt2)->first()->id;
        $vehicleJkt2Triton = Vehicle::where('registration_number', 'BG 1111 AV')->first()->id ?? Vehicle::where('office_id', $jkt2)->skip(1)->first()->id;
        $vehicleJkt1Hilux = Vehicle::where('registration_number', 'BG 1111 AA')->first()->id;

        $bookings = [

            [
                'booking_code' => 'BKG-OFC10-202605-CC2V',
                'office_id'    => $jkt2,
                'vehicle_id'   => $vehicleJkt2Avanza,
                'driver_id'    => $driverAya,
                'purpose'      => 'keperluan operasional',
                'start_date'   => '2026-04-30',
                'end_date'     => '2026-05-02',
                'status'       => 'ongoing',
            ],
            [
                'booking_code' => 'BKG-OFC10-202605-KLU1',
                'office_id'    => $jkt2,
                'vehicle_id'   => $vehicleJkt2Triton,
                'driver_id'    => $driverNathan,
                'purpose'      => 'keperluan operasional',
                'start_date'   => '2026-05-05',
                'end_date'     => '2026-05-08',
                'status'       => 'finished',
            ],
            [
                'booking_code' => 'BKG-OFC9-202605-JRKA',
                'office_id'    => $jkt1,
                'vehicle_id'   => $vehicleJkt1Hilux,
                'driver_id'    => $driverJo,
                'purpose'      => 'keperluan operasional',
                'start_date'   => '2026-05-21',
                'end_date'     => '2026-05-22',
                'status'       => 'pending',
            ],
        ];

        foreach ($bookings as $booking) {
            Booking::create($booking);
        }
    }
}
