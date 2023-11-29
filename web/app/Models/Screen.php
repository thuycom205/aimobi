<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Screen extends Model
{
    use HasFactory;

    // Define the table associated with the Screen model
    protected $table = 'screens';

    // Disable Laravel's mass assignment protection
    protected $guarded = [];

    // List of attributes that are castable to different types
    protected $casts = [
        'page_content' => 'array', // Automatically cast page_content to and from JSON
    ];

    // List of attributes that should be converted to dates
    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
