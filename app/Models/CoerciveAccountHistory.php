<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoerciveAccountHistory extends Model
{
    use HasFactory;

    protected $table = 'coercive_accounts_history';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'coercive_account_id',
        'fields',
        'user_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'fields' => Json::class,
    ];

    protected static function booted(): void
    {
        static::creating(function (CoerciveAccountHistory $account) {
            $account->id = Str::uuid();
        });
    }
}
