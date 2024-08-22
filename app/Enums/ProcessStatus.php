<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class ProcessStatus extends Enum
{
    const activo = 70;
    const pasivo = 71;
    const congelado = 72;

    public function toArray(): mixed
    {
        return $this;
    }
}
