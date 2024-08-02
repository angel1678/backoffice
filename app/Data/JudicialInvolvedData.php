<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\RequiredIf;
use Spatie\LaravelData\Attributes\Validation\StringType;

#[MapOutputName(SnakeCaseMapper::class)]
class JudicialInvolvedData extends Data
{
    public function __construct(
        #[Required, StringType]
        public mixed $type,
        #[Required]
        public string $name,

        // #[Nullable, RequiredIf('type', 'defendant')]
        // public ?int $defendantType,
    ) {
        $this->type = $type == 'actor' ? 50 : 51;
    }
}
