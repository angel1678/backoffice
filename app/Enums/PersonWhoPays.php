<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class PersonWhoPays extends Enum
{
    const CLIENTE = 40;
    const ACTOR = 41;
    const DEMANDADO = 42;
}
