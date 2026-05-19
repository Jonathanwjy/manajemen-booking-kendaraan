<?php

namespace Database\Seeders;

use App\Models\Office;
use App\Models\Vehicle;
use App\Models\VehicleType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipeOrang = VehicleType::where('name', 'Angkutan Orang')->first()->id;
        $tipeBarang = VehicleType::where('name', 'Angkutan Barang')->first()->id;

        $jkt1 = Office::where('name', 'DKI Jakarta 1')->first()->id;
        $jkt2 = Office::where('name', 'DKI Jakarta 2')->first()->id;
        $kalsel = Office::where('name', 'Kantor Kalsel')->first()->id;
        $kalsel2 = Office::where('name', 'Kantor Kalsel 2')->first()->id;
        $kaltim = Office::where('name', 'Kantor Kaltim')->first()->id;
        $sby = Office::where('name', 'Kantor Surabaya')->first()->id;

        $vehicles = [
            [
                'office_id' => $jkt2,
                'vehicle_type_id' => $tipeOrang,
                'model' => 'Mitsubishi Triton',
                'year' => 2025,
                'registration_number' => 'BG 1111 AV',
                'odometer' => 0,
                'ownership' => 'Owned',
                'vendor' => null,
                'status' => 'Available',
            ],
            [
                'office_id' => $kalsel,
                'vehicle_type_id' => $tipeBarang,
                'model' => 'Mitsubishi Fuso',
                'year' => 2025,
                'registration_number' => 'BG 2222 AB',
                'odometer' => 1500,
                'ownership' => 'Owned',
                'vendor' => null,
                'status' => 'Available',
            ],
            [
                'office_id' => $kalsel2,
                'vehicle_type_id' => $tipeOrang,
                'model' => 'Toyota Avanza',
                'year' => 2007,
                'registration_number' => 'BG 1111 AG',
                'odometer' => 125000,
                'ownership' => 'Owned',
                'vendor' => null,
                'status' => 'Available',
            ],
            [
                'office_id' => $kalsel2,
                'vehicle_type_id' => $tipeOrang,
                'model' => 'Mitsubishi Triton',
                'year' => 2025,
                'registration_number' => 'BG 2222 AG',
                'odometer' => 10,
                'ownership' => 'Owned',
                'vendor' => null,
                'status' => 'Available',
            ],
            [
                'office_id' => $kaltim,
                'vehicle_type_id' => $tipeBarang,
                'model' => 'Mitsubishi Fuso',
                'year' => 2023,
                'registration_number' => 'BG 1111 AN',
                'odometer' => 45000,
                'ownership' => 'Owned',
                'vendor' => null,
                'status' => 'Available',
            ],
            [
                'office_id' => $kaltim,
                'vehicle_type_id' => $tipeOrang,
                'model' => 'Toyota Avanza',
                'year' => 2024,
                'registration_number' => 'BG 222 AN',
                'odometer' => 15000,
                'ownership' => 'Owned',
                'vendor' => null,
                'status' => 'Available',
            ],
            [
                'office_id' => $sby,
                'vehicle_type_id' => $tipeOrang,
                'model' => 'Mitsubishi Triton',
                'year' => 2024,
                'registration_number' => 'BG 2222 BB',
                'odometer' => 22000,
                'ownership' => 'Owned',
                'vendor' => null,
                'status' => 'Available',
            ],
            [
                'office_id' => $jkt1,
                'vehicle_type_id' => $tipeOrang,
                'model' => 'Toyota Hilux',
                'year' => 2026,
                'registration_number' => 'BG 2222 AA',
                'odometer' => 50,
                'ownership' => 'Owned',
                'vendor' => null,
                'status' => 'Available',
            ],
            [
                'office_id' => $kalsel,
                'vehicle_type_id' => $tipeBarang,
                'model' => 'Mitsubishi Fuso',
                'year' => 2024,
                'registration_number' => 'BG 1111 AB',
                'odometer' => 38000,
                'ownership' => 'Owned',
                'vendor' => null,
                'status' => 'Available',
            ],
            [
                'office_id' => $jkt1,
                'vehicle_type_id' => $tipeOrang,
                'model' => 'Toyota Hilux',
                'year' => 2024,
                'registration_number' => 'BG 1111 AA',
                'odometer' => 29000,
                'ownership' => 'Rented',
                'vendor' => 'PT Rental Mobil Jaya',
                'status' => 'Booked',
            ],
            [
                'office_id' => $jkt1,
                'vehicle_type_id' => $tipeOrang,
                'model' => 'Toyota Haha',
                'year' => 2024,
                'registration_number' => 'BG 2221 AA',
                'odometer' => 5000,
                'ownership' => 'Rented',
                'vendor' => 'PT Rental Mobil Jaya',
                'status' => 'Booked',
            ],
        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::create($vehicle);
        }
    }
}
