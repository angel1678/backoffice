<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Configuracion extends Model
{
    use HasFactory;

    protected $table = 'configuraciones';

    protected $fillable = [
        'grupo',
        'parametro',
        'nombre',
        'descripcion',
        'type',
        'valor',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function scopeGetParam(Builder $query, $grupo, $parametro)
    {
        $query->where('grupo', '=', $grupo)
            ->where('parametro', '=', $parametro);
    }

    public function scopeGetGroup(Builder $query, $grupo)
    {
        $query->where('grupo', '=', $grupo);
    }
}
