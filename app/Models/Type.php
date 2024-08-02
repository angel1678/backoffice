<?php

namespace App\Models;

use App\Traits\DropdownTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Type extends Model
{
    use HasFactory, DropdownTrait;

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

    protected function scopeGroup(Builder $builder, string $group)
    {
        $builder->where('group', $group)
            ->where('is_active', true)
            ->dropdown();
    }
}
