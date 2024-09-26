<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Rules\IdentificationRule;
use App\Rules\JudicialProcessRule;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;

#[MapOutputName(SnakeCaseMapper::class)]
class JudicialProcessData extends Data
{
    #[Computed]
    public string $judicaturaId;

    #[Computed]
    public string $anioId;

    #[Computed]
    public string $numeroId;

    public function __construct(
        #[Rule([new Required, new JudicialProcessRule])]
        public string $process,

        #[Required]
        public int $clientId,

        #[Required]
        /** @var object[] */
        public array $actors,

        #[Required]
        /** @var object[] */
        public array $defendants,

        #[Required]
        public int $personWhoPays,

        #[Rule([new Required, new IdentificationRule('dni')])]
        public string $identification,

        #[Required]
        public string $numberOperation,

        #[Required]
        public float $amount,

        public int $relevantInformation,

        #[MapOutputName('type_of_procedure_id')]
        public int $typeProcedure,

        #[MapOutputName('procedural_stage_id')]
        public int $proceduralStage,

        #[MapOutputName('user_id')]
        public int $responsible,
    ) {
        [$judicaturaId, $anioId, $numeroId] = explode('-', $process);
        $this->judicaturaId = $judicaturaId;
        $this->anioId = $anioId;
        $this->numeroId = $numeroId;
    }
}
