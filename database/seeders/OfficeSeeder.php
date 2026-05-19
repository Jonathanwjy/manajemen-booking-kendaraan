<?php

namespace Database\Seeders;

use App\Models\Office;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $offices = [
            ['name' => 'DKI Jakarta 1', 'location' => 'Jakarta Pluit'],
            ['name' => 'DKI Jakarta 2', 'location' => 'Jakarta Selatan'],
            ['name' => 'Kantor Tanggerang', 'location' => 'Tanggerang'],
            ['name' => 'Kantor Surabaya', 'location' => 'Surabaya Timur'],
            ['name' => 'Kantor Kalsel', 'location' => 'Kalimantan Selatan'],
            ['name' => 'Kantor Kaltim', 'location' => 'Kalimantan Timur'],
            ['name' => 'Kantor Kalsel 2', 'location' => 'Kalimantan Selatan'],
        ];

        foreach ($offices as $office) {
            Office::create($office);
        }
    }
}
