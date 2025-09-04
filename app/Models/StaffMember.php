<?php

// app/Models/StaffMember.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffMember extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'employee_id', 'department', 'email'];

    public function attendance()
    {
        return $this->hasMany(StaffAttendance::class);
    }
}
