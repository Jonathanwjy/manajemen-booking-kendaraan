<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleUsage extends Model
{
    protected $fillable = [
        'booking_id',
        'vehicle_id',
        'driver_id',
        'fuel_used',
        'start_odometer',
        'end_odometer'
    ];

    public function Vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
    public function Driver()
    {
        return $this->belongsTo(Driver::class);
    }
    public function Booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
