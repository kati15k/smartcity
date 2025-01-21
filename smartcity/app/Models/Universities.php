<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Universities extends Model
{
    use HasFactory;

    protected $fillable=[

        'name',
        'img_url',
        'established_year',
        'website',
        'description',
        'contact_email',
        'phone_number',
        'location',
    ];
}
