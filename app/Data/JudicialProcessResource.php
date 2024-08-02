<?php

namespace App\Data;

use App\Models\Proceso;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Resource;

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
        // public string $status,
        public string $userName,
    ) {
    }
}
