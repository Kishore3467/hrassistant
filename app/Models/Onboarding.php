<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Onboarding extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'full_name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'zip',
        'degree',
        'university',
        'graduation_year',
        'job_title',
        'years_of_exp',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
