<?php

namespace App\Data;

use App\Models\Proceso;
use Spatie\LaravelData\Resource;

class JudicialProcessResource extends Resource
{
    public function __construct(
        public int $id,
        public string $process,
        public string $client,
        public string $actor,
        public string $defendant,
        public string $typeProcedure,
        public string $proceduralStage,
        public string $status,
        public string $userName,
    ) {}

    public static function fromModel(Proceso $process): self
    {
        $processMovement = $process->movimientos()
            ->latest()
            ->first();

        return new self(
            $process->id,
            "{$process->judicatura_id}-{$process->anio_id}-{$process->numero_id}",
            "",
            $processMovement->actor_ofendido,
            $processMovement->demandado_procesado,
            "",
            "",
            "",
            $process->user->name,
        );
    }
}
