<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceSetting extends Model
{
    protected $fillable = [
        'regularization',
        'on_duty',
        'hourly_permission',
        'breaks',
        'kiosk',
        'office_remote',
        'attendance_policy_name',
        'overtime_enabled',
    ];

    protected $casts = [
        'regularization' => 'bool',
        'on_duty' => 'bool',
        'hourly_permission' => 'bool',
        'breaks' => 'bool',
        'kiosk' => 'bool',
        'office_remote' => 'bool',
        'overtime_enabled' => 'bool',
    ];
}
