<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleType extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'types',
        'description',
    ];

    public function Vehicle()
    {
        return $this->hasMany(Vehicle::class);
    }
}
