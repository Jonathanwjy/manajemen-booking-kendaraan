<?php

namespace App\Services;

use App\Models\Driver;
use App\Models\Office;
use Illuminate\Support\Facades\DB;

class DriverService
{

    public function index(?string $search = null)
    {
        return Driver::with('office')
            ->when($search, function ($query) use ($search) {
                $search = strtolower($search);

                $query->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
                    ->orWhereHas('office', function ($q) use ($search) {
                        $q->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                    });
            })
            ->orderBy('status')
            ->paginate(10)
            ->withQueryString();
    }
    public function create(): array
    {
        return [
            'offices' => Office::select('id', 'name')
                ->orderBy('name')
                ->get(),
        ];
    }

    public function store(array $data): Driver
    {
        return DB::transaction(function () use ($data) {
            return Driver::create($data);
        });
    }

    public function edit(Driver $driver): array
    {
        return [
            'driver' => $driver,
            'offices' => Office::select('id', 'name')
                ->orderBy('name')
                ->get(),
        ];
    }

    public function update(Driver $driver, array $data): Driver
    {
        return DB::transaction(function () use ($driver, $data) {
            $driver->update($data);
            return $driver->fresh();
        });
    }

    public function delete(Driver $driver): bool
    {
        return $driver->delete();
    }
}
