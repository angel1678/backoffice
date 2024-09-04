<?php

namespace App\Data;

use App\Enums\ProcessStatus;
use Spatie\LaravelData\Resource;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\MapInputName;

class JudicialProcessResource extends Resource
{
    public function __construct(
        public string $id,
        public string $process,

        public JudicialClientResource $client,

        #[MapInputName('actor_names')]
        public string $actors,

        #[MapInputName('defendant_names')]
        public string $defendants,
        public ?string $typeProcedure,
        public ?string $proceduralStage,
        public int $status,
        public ?string $userName,
        public ?string $statusName,
    ) {}
}
