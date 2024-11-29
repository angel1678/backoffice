<?php

namespace App\Models;

use App\Traits\DropdownTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RelevantInformation extends Model
{
    use HasFactory, DropdownTrait;

    protected $table = 'relevant_information';

    protected $fillable = [
        'name',
        'is_visible',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
