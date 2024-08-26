<?php

namespace App\Models;

use App\Traits\DropdownTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Template extends Model
{
    use HasFactory, HasUuids, DropdownTrait;

    protected $table = 'templates';

    protected $fillable = [
        'name',
        'description',
        'template'
    ];

    protected $appends = [
        'active'
    ];

    public function getActiveAttribute()
    {
        return $this->is_active ? 'Si' : 'No';
    }
}
