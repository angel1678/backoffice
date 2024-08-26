<?php

namespace App\Data;

use App\Models\Proceso;
use App\Models\ProcesoDetalle;
use App\Models\ProcesoMovimiento;
use Spatie\LaravelData\Data;

class JudicialProcessTemplateData extends Data
{
    public function __construct(
        public string $process,
        public string $client,
        public string $dependencieJudicial,
        public string $ejecutive,
        public string $defendants,
    ) {}

    public static function fromModel(ProcesoMovimiento $movimiento): self
    {
        $process = $movimiento->proceso;

        return new self(
            process: $process->process,
            client: $process->client->name,
            dependencieJudicial: $movimiento->dependencia_jurisdiccional,
            ejecutive: $process->user->name,
            defendants: $process->defendants()->pluck('name')->join(','),
        );
    }
}
