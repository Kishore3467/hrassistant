<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'employee_id', 'name', 'email', 'department', 'role',
        'joining_date', 'leave_details', 'salary', 'rating', 'last_review'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
