<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Office extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'location'
    ];

    public function Driver()
    {
        return $this->hasMany(Driver::class);
    }

    public function Vehicle()
    {
        return $this->hasMany(Vehicle::class);
    }

    public function Booking()
    {
        return $this->hasMany(Booking::class);
    }
}
