<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    /** @use HasFactory<\Database\Factories\DocumentFactory> */
    use HasFactory;

    protected $fillable = [
        'document_type',
        'delivery_method',
        'email',
        'address',
        'city',
        'postal_code',
        'reason',
        'status'
    ];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
