<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'type',
        'recipient_name',
        'position',
        'company_name',
        'content'
    ];
}
