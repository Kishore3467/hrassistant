<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullName',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'zip',
        'degree',
        'university',
        'graduationYear',
        'company',
        'jobTitle',
        'yearsOfExp',
    ];
}
