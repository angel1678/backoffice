<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcesoComentarioMencion extends Model
{
    use HasFactory;

    protected $table = 'procesos_comentarios_menciones';

    protected $fillable = [
        'comentatio_id',
        'user_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
