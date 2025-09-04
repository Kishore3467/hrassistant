<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnboardingChecklist extends Model
{
    use HasFactory;

    protected $fillable = ['employee_name', 'start_date', 'tasks'];

    protected $casts = [
        'tasks' => 'array',
        'start_date' => 'date',
    ];
}
