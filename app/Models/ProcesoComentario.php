<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcesoComentario extends Model
{
    use HasFactory;

    protected $table = 'procesos_comentarios';

    protected $fillable = [
        'description',
        'user_id'
    ];

    protected $hidden = [
        'user_id',
        'detalle_id',
        'created_at',
        'updated_at'
    ];

    protected $appends = [
        'user_name',
        'date',
    ];

    protected $casts = [
        'created_at' => 'datetime:d/m/Y',
    ];

    public function getUserNameAttribute()
    {
        return $this->user->name;
    }

    public function getDateAttribute()
    {
        return $this->created_at->format('d/M/Y H:i');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function menciones()
    {
        return $this->hasMany(ProcesoComentarioMencion::class, 'comentario_id');
    }
}
