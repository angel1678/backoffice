<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TemplateParam extends Model
{
    use HasFactory;

    protected $table = 'templates_params';

    protected $fillable = [
        'name',
        'key',
        'column'
    ];
}
