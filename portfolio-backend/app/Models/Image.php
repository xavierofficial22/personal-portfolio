<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'path',
        'category',
        'update_id',
        'order',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'order' => 'integer',
        'update_id' => 'integer',
    ];

    // Relationship: Image belongs to an Update
    public function updateRecord()
    {
        return $this->belongsTo(Update::class);
    }
}