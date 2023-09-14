<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CoerciveImport implements SkipsOnError, WithMultipleSheets
{
    use Importable, SkipsErrors;

    protected $clientId;

    public function __construct($cliendId)
    {
        $this->clientId = $cliendId;
    }

    public function sheets(): array
    {
        return [
            0 => new CoerciveAccountsImport($this->clientId),
        ];
    }
}
