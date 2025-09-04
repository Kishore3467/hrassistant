<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerformanceEmployee extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'name',
        'role',
        'department',
        'rating',
        'last_review',
    ];
}
