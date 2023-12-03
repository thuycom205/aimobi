<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppSubmission extends Model
{
    use HasFactory;

    // Specify the associated table name
    protected $table = 'app_submission';

    // Specify the primary key if it's not 'id'
    protected $primaryKey = 'id';

    // Disable the auto-incrementing key if it's not an integer
    public $incrementing = true;

    // Specify if the primary key is auto incrementing
    public $timestamps = true;

    // Define fillable properties to allow mass assignment
    protected $fillable = [
        'shop_name',
        'phone',
        'email',
        'app_name',
        'splash_screen_img',
        'icon_url',
        'firebase_information',
        'app_submission_status',
        'app_version'
    ];

    // Define casts for fields as necessary
    protected $casts = [
        'firebase_information' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}
