<?php

namespace App\Models;

use App\Traits\DropdownTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JudicialClient extends Model
{
    use HasFactory, DropdownTrait;

    protected $table = "judicial_clients";

    protected $fillable = [
        'name',
        'ruc',
        'billed_by',
    ];

    public function judicials(): HasMany
    {
        return $this->hasMany(Proceso::class);
    }
}
