<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class GeographicalDistributionType extends Enum
{
    const COUNTRY = 20;
    const PROVINCE = 21;
    const CANTON = 22;
    const PARISH = 23;
}
