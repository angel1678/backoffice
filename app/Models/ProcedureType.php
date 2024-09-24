<?php

namespace App\Models;

use App\Traits\DropdownTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function judicialsProcedureType(): HasMany
    {
        return $this->hasMany(Proceso::class, 'type_of_procedure_id');
    }

    public function judicialsProcedureStage(): HasMany
    {
        return $this->hasMany(Proceso::class, 'procedural_stage_id');
    }
}
