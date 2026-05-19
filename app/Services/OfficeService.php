<?php

namespace App\Services;

use App\Models\Office;
use Illuminate\Support\Facades\DB;

class OfficeService
{

    public function index()
    {
        return Office::orderBy('created_at', 'asc')->get();
    }
    public function store(array $data): Office
    {
        return DB::transaction(function () use ($data) {
            return Office::create($data);
        });
    }

    public function update(Office $office, array $data): Office
    {
        return DB::transaction(function () use ($office, $data) {
            $office->update($data);
            return $office->fresh();
        });
    }

    public function delete(Office $office): bool
    {
        return $office->delete();
    }
}
