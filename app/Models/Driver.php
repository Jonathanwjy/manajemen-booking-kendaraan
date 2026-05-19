<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Driver extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'office_id',
        'status',
        'phone_number',
    ];

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
}
