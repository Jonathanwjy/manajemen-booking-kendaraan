<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'vehicle_id',
        'service_date',
        'odometer',
        'next_service_date',
        'next_service_odometer',
        'notes',
        'status',
    ];

    public function Vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
