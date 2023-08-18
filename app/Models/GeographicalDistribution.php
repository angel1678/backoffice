<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GeographicalDistribution extends Model
{
    use HasFactory;

    protected $table = 'geographical_distribution';

    protected $fillable = [
        'type_id',
        'parent_id',
        'name',
        'code',
    ];

    public function sons(): HasMany
    {
        return $this->hasMany(GeographicalDistribution::class, 'parent_id', 'id');
    }

    public function scopeFindByName(Builder $query, string $name)
    {
        return $query->where('name', Str::upper($name))
            ->firstOr(fn () => (object) ['id' => null]);
    }
}
