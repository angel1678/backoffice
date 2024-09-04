<?php

namespace App\Models;

use App\Traits\DropdownTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProcedureType extends Model
{
    use HasFactory, DropdownTrait;

    protected $table = "procedures_types";

    protected $fillable = [
        'parent_id',
        'name',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(ProcedureType::class, 'parent_id', 'id');
    }
}
