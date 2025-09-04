<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CorporatePolicy extends Model
{
    use HasFactory;

    // Fillable fields for mass assignment
    protected $fillable = [
        'name',       // Policy name
        'category',   // Policy category (HR, IT, Compliance, etc.)
        'file_path',  // Path to the PDF file
        'updated',    // Last updated date
    ];

    // If you want to cast 'updated' as a date automatically
    protected $casts = [
        'updated' => 'date',
    ];
}
