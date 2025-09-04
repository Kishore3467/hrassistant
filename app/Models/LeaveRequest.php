<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'date', 'end_date', 'subject', 'reason', 'leave_type', 'status'
    ];
}
