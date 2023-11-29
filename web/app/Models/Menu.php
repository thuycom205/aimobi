<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = ['shop_name', 'title', 'menu_type', 'menu_items'];
    // List of attributes that are castable to different types
    protected $casts = [
        'menu_items' => 'array', // Automatically cast page_content to and from JSON
    ];

    // Add any other model properties or methods you need
}
