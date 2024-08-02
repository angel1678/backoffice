<?php

namespace App\Data;

use Spatie\LaravelData\Resource;

class JudicialClientResource extends Resource
{
    public function __construct(
        public int $id,
        public string $name,
    ) {
    }
}
