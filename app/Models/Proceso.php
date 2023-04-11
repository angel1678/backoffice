<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'user_name'
    ];

    protected function getUserNameAttribute()
    {
        return $this->user->name;
    }

    public function movimientos(): HasMany
    {
        return $this->hasMany(ProcesoMovimiento::class, 'proceso_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
