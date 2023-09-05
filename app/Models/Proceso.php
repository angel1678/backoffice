<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class Proceso extends Model
{
    use HasFactory;

    protected $table = 'procesos';

    protected $fillable = [
        'judicatura_id',
        'anio_id',
        'numero_id',
        'user_id',
    ];

    protected $hidden = [
        'user',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    protected $appends = [
        'user_name',
        'codigo_proceso'
    ];

    protected function getCodigoProcesoAttribute()
    {
        return "{$this->judicatura_id}-{$this->anio_id}-{$this->numero_id}";
    }

    protected function getUserNameAttribute()
    {
        return $this->user?->name;
    }

    public function movimientos(): HasMany
    {
        return $this->hasMany(ProcesoMovimiento::class, 'proceso_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function associates(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'procesos_user');
    }

    public function scopeUltimaFechaDetalle(Builder $query, $fecha)
    {
        $query->join('procesos_movimiento as pm', function (JoinClause $join) {
            $join->on('procesos.id', '=', 'pm.proceso_id')
                ->on('pm.id', '=', DB::raw('(select id from procesos_movimiento where proceso_id = procesos.id order by fecha desc limit 1)'));
        })->join('procesos_detalle as pd', function (JoinClause $join) {
            $join->on('pm.id', '=', 'pd.movimiento_id')
                ->on('pd.id', '=', DB::raw('(select id from procesos_detalle where movimiento_id = pm.id order by fecha desc limit 1)'));
        })->where('pd.fecha', '<=', $fecha)->select('procesos.*');
    }
}
