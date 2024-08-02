<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Rules\IdentificationRule;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\Required;

class JudicialClientData extends Data
{
    public function __construct(
        #[Required]
        #[MapOutputName('name')]
        public string $clientName,

        #[Rule(new Required(), new IdentificationRule('ruc'))]
        #[MapOutputName('ruc')]
        public string $identification,

        #[MapOutputName('billed_by')]
        public int $billedBy,
    ) {
    }
}
