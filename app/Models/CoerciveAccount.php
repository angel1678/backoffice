<?php

namespace App\Models;

use App\Casts\CurrencyFormat;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoerciveAccount extends Model
{
    use HasFactory;

    protected $table = 'coercive_accounts';

    protected $fillable = [
        'process',
        'identification',
        'name',
        'stage',
        'stage_id',
        'principal_amount',
        'observation',
        'aforementioned',
        'dispatch',
        'category',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        // 'principal_amount' => CurrencyFormat::class,
    ];

    protected $appends = [
        'executive_name',
        'stage_name',
        'client_name',
    ];

    public function getExecutiveNameAttribute()
    {
        return $this->executive->name;
    }

    public function getStageNameAttribute()
    {
        return Str::upper($this->coerciveStage->name ?? $this->stage);
    }

    public function getClientNameAttribute()
    {
        return $this->client->name;
    }

    public function executive(): BelongsTo
    {
        return $this->belongsTo(User::class, 'executive_id');
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(CoerciveAccountContact::class);
    }

    public function coerciveStage()
    {
        return $this->belongsTo(CoerciveAccountStage::class, 'stage_id', 'id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(CoerciveClient::class);
    }
}
