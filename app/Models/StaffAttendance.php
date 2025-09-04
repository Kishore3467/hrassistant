<?php

// app/Models/StaffAttendance.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffAttendance extends Model
{
    use HasFactory;

    protected $fillable = ['staff_name','staff_member_id', 'date', 'status'];

    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class);
    }
}
