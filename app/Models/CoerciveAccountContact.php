<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoerciveAccountContact extends Model
{
    use HasFactory;

    protected $table = 'coercive_account_contacts';

    protected $fillable = [
        'type_id',
        'data',
        'observation',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'data' => Json::class,
    ];

    protected $appends = [
        'type_name'
    ];

    public function getTypeNameAttribute()
    {
        return $this->type->name;
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class);
    }
}
