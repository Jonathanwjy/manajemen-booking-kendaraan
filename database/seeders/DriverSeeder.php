<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\Office;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kalselId = Office::where('name', 'Kantor Kalsel')->first()->id;
        $kalsel2Id = Office::where('name', 'Kantor Kalsel 2')->first()->id;
        $jakarta2Id = Office::where('name', 'DKI Jakarta 2')->first()->id;
        $jakarta1Id = Office::where('name', 'DKI Jakarta 1')->first()->id;

        $drivers = [
            [
                'name' => 'wij',
                'office_id' => $kalselId,
                'phone_number' => '9989004',
                'status' => 'available'
            ],
            [
                'name' => 'jona',
                'office_id' => $kalsel2Id,
                'phone_number' => '9989004',
                'status' => 'available'
            ],
            [
                'name' => 'nathan',
                'office_id' => $jakarta2Id,
                'phone_number' => '9989004',
                'status' => 'available'
            ],
            [
                'name' => 'Jo',
                'office_id' => $jakarta1Id,
                'phone_number' => '9989004',
                'status' => 'unavailable'
            ],
            [
                'name' => 'aya',
                'office_id' => $jakarta2Id,
                'phone_number' => '9989004',
                'status' => 'unavailable'
            ],
        ];

        foreach ($drivers as $driver) {
            Driver::create($driver);
        }
    }
}
