<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'employee_id',
        'position',
        'department',
        'join_date',
        'salary',
        'bonus',
        'deductions',
        'status',
        'net_pay'
    ];

    // Automatically calculate net pay before saving
    protected static function booted()
    {
        static::saving(function ($payroll) {
            $payroll->net_pay = $payroll->salary + $payroll->bonus - $payroll->deductions;
        });
    }
}
