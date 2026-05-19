<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'office_id',
        'vehicle_type_id',
        'model',
        'year',
        'registration_number',
        'ownership',
        'vendor',
        'odometer',
        'status'
    ];

    public function VehicleType()
    {
        return $this->belongsTo(VehicleType::class);
    }

    public function Office()
    {
        return $this->belongsTo(Office::class);
    }

    public function Booking()
    {
        return $this->hasMany(Booking::class);
    }

    public function VehicleUsage()
    {
        return $this->hasMany(VehicleUsage::class);
    }

    public function Service()
    {
        return $this->hasMany(Service::class);
    }
}
