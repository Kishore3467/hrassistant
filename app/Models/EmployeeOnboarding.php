<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeOnboarding extends Model
{
    protected $fillable = [
        'fullName', 'email', 'phone', 'address', 'dateOfBirth',
        'emergencyContactName', 'emergencyContactPhone',
        'joiningDate', 'department', 'designation', 'employeeId',
        'workLocation', 'probationPeriod', 'reportingManager',
        'education', 'experience', 'bankName', 'accountNumber', 'ifscCode',
        'companyEmail', 'laptopSerial', 'kitStatus', 'additionalNotes',
    ];

    // Cast JSON fields to arrays automatically
    protected $casts = [
        'education' => 'array',
        'experience' => 'array',
    ];
}
