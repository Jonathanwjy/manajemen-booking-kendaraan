<?php

namespace Database\Seeders;

use App\Models\VehicleType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Angkutan Orang',
                'description' => 'Diperuntukan untuk transportasi karyawan'
            ],
            [
                'name' => 'Angkutan Barang',
                'description' => 'Diperuntukan untuk mengangkut barang'
            ],
        ];

        foreach ($types as $type) {
            VehicleType::create($type);
        }
    }
}
