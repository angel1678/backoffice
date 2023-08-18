<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoerciveAccountStage extends Model
{
    use HasFactory;

    protected $table = 'coercive_account_stages';

    protected $fillable = [
        'name',
        'with_notification',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
