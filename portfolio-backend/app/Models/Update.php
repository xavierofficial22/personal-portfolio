<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Update extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'images',
        'category',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'images' => 'array',
    ];
}