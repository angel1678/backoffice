<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JudicialFile extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'judicial_files';

    protected $fillable = [
        'judicial_id',
        'judicial_type',
        'location',
        'name',
        'origin_name',
    ];
}
