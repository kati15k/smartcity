<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobs extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'salary',
        'job_requirements',
        'job_link',
    ];
}
