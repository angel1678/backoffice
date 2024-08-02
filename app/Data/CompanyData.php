<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Rules\IdentificationRule;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Attributes\Validation\Required;

class CompanyData extends Data
{
    public function __construct(
        #[Required]
        public string $name,
        #[Rule(new Required(), new Unique('companies', 'ruc'), new IdentificationRule('ruc'))]
        public string $ruc,
    ) {
    }
}
