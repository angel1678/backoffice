<?php

namespace App\Models;

use App\Traits\DropdownTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JudicialInvolved extends Model
{
    use HasFactory, DropdownTrait;

    protected $table = 'judicial_involved';

    protected $fillable = [
        'type',
        'name',
        'defendant_type',
    ];

    protected function scopeType(Builder $builder, int $type)
    {
        $builder->where('type', $type)
            ->dropdown();
    }
}
