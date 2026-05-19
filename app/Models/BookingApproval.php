<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingApproval extends Model
{

    protected $fillable = [
        'booking_id',
        'approver_id',
        'status'
    ];

    public function Booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class, 'approver_id');
    }
}
