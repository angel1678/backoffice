<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CoerciveAccountStage extends Model
{
    use HasFactory;

    protected $table = 'coercive_account_stages';

    protected $fillable = [
        'name',
        'client_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function scopeFindByNameOrCreate(Builder $query, $clientId, $name)
    {
        $stage = $query->where('client_id', $clientId)
            ->where(DB::raw('upper(name)'), 'like', "%{$name}%")
            ->first();

        if (empty($stage)) {
            return $query->create(['name' => $name, 'client_id' => $clientId]);
        }

        return $stage;
    }
}
