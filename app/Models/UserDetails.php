<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    // use HasFactory;

    protected $table = 'user_details';
    protected $fillable = [
        'user_id', 
        'full_name', 
        'address',
        'phone', 
        'photo',
        'study_level',
        'institute_name',
        'class_name',
        'dept_group',
        'session',
    ];

    protected $primaryKey = 'id';
    public $timestamps = false;
}
