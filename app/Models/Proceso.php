<?php

namespace App\Models;

use App\Casts\CurrencyFormat;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Proceso extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'procesos';

    protected $fillable = [
        'judicatura_id',
        'anio_id',
        'numero_id',
        'client_id',
        'person_who_pays',
        'identification',
        'number_operation',
        'amount',
        'relevant_information',
        'type_of_procedure_id',
        'procedural_stage_id',
        'user_id',
        'status',
    ];

    protected $hidden = [
        'user',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'amount' => CurrencyFormat::class,
        // 'status' => ProcessStatus::class,
    ];

    protected $appends = [
        'user_name',
        'codigo_proceso',
        'process',
        'actor_names',
        'defendant_names',
        'procedural_stage',
    ];

    protected function getCodigoProcesoAttribute()
    {
        return "{$this->judicatura_id}-{$this->anio_id}-{$this->numero_id}";
    }

    protected function getProcessAttribute()
    {
        return "{$this->judicatura_id}-{$this->anio_id}-{$this->numero_id}";
    }

    protected function getUserNameAttribute()
    {
        return $this->user?->name;
    }

    protected function getActorNamesAttribute(): string
    {
        return $this->actors->implode('name', ', ');
    }

    protected function getDefendantNamesAttribute(): string
    {
        return $this->defendants->implode('name', ', ');
    }

    protected function getTypeProcedureAttribute(): string|null
    {
        return $this->procedureType?->name;
    }

    protected function getProceduralStageAttribute(): string|null
    {
        return $this->procedureStage?->name;
    }

    protected function getStatusNameAttribute(): string
    {
        return Type::find($this->status)?->name;
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(JudicialClient::class);
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

    public function involved(): BelongsToMany
    {
        return $this->belongsToMany(JudicialInvolved::class, 'judicial_process_involved', 'judicial_id', 'involved_id');
    }

    public function actors(): BelongsToMany
    {
        return $this->involved()->where('judicial_involved.type', 50);
    }

    public function defendants(): BelongsToMany
    {
        return $this->involved()->where('judicial_involved.type', 51);
    }

    public function files(): MorphMany
    {
        return $this->morphMany(JudicialFile::class, 'judicial');
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(ProcesoComentario::class, 'judicial');
    }

    public function procedureType(): HasOne
    {
        return $this->hasOne(ProcedureType::class, 'id', 'type_of_procedure_id');
    }

    public function procedureStage(): HasOne
    {
        return $this->hasOne(ProcedureType::class, 'id', 'procedural_stage_id');
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
