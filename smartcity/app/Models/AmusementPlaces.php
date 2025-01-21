<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AmusementPlaces extends Model
{
    use HasFactory;
    protected $fillable=[
        'name',
        'img_url',
        'description',
        'phone_number',
        'location',

    ];
}
