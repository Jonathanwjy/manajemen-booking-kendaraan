<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\BookingApproval;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class BookingApprovalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $approverNatan = User::firstOrCreate(
            ['email' => 'natan@mail.com'],
            ['name' => 'natan', 'password' => Hash::make('password123')]
        );

        $approverJaya = User::firstOrCreate(
            ['email' => 'jaya@mail.com'],
            ['name' => 'jaya', 'password' => Hash::make('password123')]
        );


        $bookingOngoing = Booking::where('booking_code', 'BKG-OFC10-202605-CC2V')->first()->id;
        $bookingFinished = Booking::where('booking_code', 'BKG-OFC10-202605-KLU1')->first()->id;
        $bookingPending = Booking::where('booking_code', 'BKG-OFC9-202605-JRKA')->first()->id;

        $approvals = [

            ['booking_id' => $bookingOngoing, 'approver_id' => $approverNatan->id, 'status' => 'accepted'],
            ['booking_id' => $bookingOngoing, 'approver_id' => $approverJaya->id, 'status' => 'accepted'],

            ['booking_id' => $bookingFinished, 'approver_id' => $approverNatan->id, 'status' => 'accepted'],
            ['booking_id' => $bookingFinished, 'approver_id' => $approverJaya->id, 'status' => 'accepted'],

            ['booking_id' => $bookingPending, 'approver_id' => $approverNatan->id, 'status' => 'pending'],
            ['booking_id' => $bookingPending, 'approver_id' => $approverJaya->id, 'status' => 'pending'],
        ];

        foreach ($approvals as $approval) {
            BookingApproval::create($approval);
        }
    }
}
