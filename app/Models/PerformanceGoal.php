<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerformanceGoal extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'progress', 'deadline'
    ];

    public function employees()
    {
        return $this->belongsToMany(PerformanceEmployee::class, 'goal_employee');
    }
}
