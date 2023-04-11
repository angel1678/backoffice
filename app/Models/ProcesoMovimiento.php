<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProcesoMovimiento extends Model
{
    use HasFactory;

    protected $table = 'procesos_movimiento';

    public $incrementing = false;
    protected $keyType = 'string';

    public function detalle(): HasMany
    {
        return $this->hasMany(ProcesoDetalle::class, 'movimiento_id', 'id');
    }
}
