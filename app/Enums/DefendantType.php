<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class DefendantType extends Enum
{
    const DEUDOR_PRINCIPAL = 60;
    const GARANTE = 61;
    const CODEUDOR = 62;
}
