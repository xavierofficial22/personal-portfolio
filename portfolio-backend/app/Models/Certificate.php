<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'full_name',
        'issuer',
        'image',
        'issue_date',
        'certificate_no',
        'score',
        'skills',
        'description',
        'is_visible',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
        'issue_date' => 'date',
    ];
}