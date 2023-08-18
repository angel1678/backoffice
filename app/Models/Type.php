<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    protected $table = 'types';

    protected $fillable = [
        'id',
        'group',
        'name',
        'description',
        'state',
        'is_visible',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('isVisible', function (Builder $builder) {
            $builder->where('is_visible', true);
        });
    }
}
