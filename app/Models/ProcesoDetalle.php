<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class ProcesoDetalle extends Model
{
    use HasFactory;

    protected $table = 'procesos_detalle';

    public $incrementing = false;
    protected $keyType = 'string';

    public function comentarios(): HasMany
    {
        return $this->hasMany(ProcesoComentario::class, 'detalle_id', 'id');
    }

    public function movimiento(): BelongsTo
    {
        return $this->belongsTo(ProcesoMovimiento::class, 'movimiento_id');
    }

    public function files(): MorphMany
    {
        return $this->morphMany(JudicialFile::class, 'judicial');
    }
}
