<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PolicyDocument extends Model
{
    protected $fillable = [
        'title',
        'description',
        'file_path', // ✅ Add this line
        'parsed_text', // If you're saving parsed text too
    ];
}

