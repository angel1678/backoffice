<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CoerciveClient extends Model
{
    use HasFactory;

    protected $table = 'coercive_clients';

    protected $fillable = [
        'name',
        'description',
        'user_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function accounts(): HasMany
    {
        return $this->hasMany(CoerciveAccount::class, 'client_id');
    }
}
