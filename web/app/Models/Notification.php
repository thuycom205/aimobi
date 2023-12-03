<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    // Table name (optional if the table name is the plural of model name)
    protected $table = 'notifications';

    // Primary key (optional if the primary key is 'id')
    protected $primaryKey = 'id';

    // Disable Laravel's timestamps if not required
    public $timestamps = true;

    // Fillable fields for mass assignment
    protected $fillable = [
        'shop_name',
        'type',
        'title',
        'content',
        'send_time_type',
        'scheduled_send_time',
        'rich_media',
        'img_url',
        'status'
    ];

    // Casts (optional, for casting attributes to native types)
    protected $casts = [
        'scheduled_send_time' => 'datetime',
        'rich_media' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Enum values (optional, for validation)
    public const SEND_TIME_TYPES = ['immediate', 'scheduled'];
    public const STATUSES = ['pending', 'processed', 'sent', 'archived', 'scheduled'];
}
