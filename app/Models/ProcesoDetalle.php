<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcesoDetalle extends Model
{
    use HasFactory;

    protected $table = 'procesos_detalle';

    public $incrementing = false;
    protected $keyType = 'string';
}
