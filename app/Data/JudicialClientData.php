<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapOutputName;

class JudicialClientData extends Data
{
    public function __construct(
        #[MapOutputName('name')]
        public string $clientName,

        #[MapOutputName('ruc')]
        public string $identification,

        #[MapOutputName('billed_by')]
        public int $billedBy,
    ) {
    }
}
