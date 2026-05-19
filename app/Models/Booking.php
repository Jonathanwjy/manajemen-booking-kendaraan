<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'vehicle_id',
        'driver_id',
        'office_id',
        'booking_code',
        'purpose',
        'start_date',
        'end_date',
        'status'
    ];

    public function Office()
    {
        return $this->belongsTo(Office::class);
    }

    public function Driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function Vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function BookingApproval()
    {
        return $this->hasMany(BookingApproval::class);
    }

    public function VehicleUsage()
    {
        return $this->hasOne(VehicleUsage::class);
    }
}
