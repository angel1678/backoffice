<?php

namespace App\Imports;

use App\Models\Client;
use App\Models\CoerciveAccount;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Row;

class CoerciveAccountsImport implements OnEachRow, WithHeadingRow, SkipsOnError, WithMultipleSheets
{
    use Importable, SkipsErrors;

    protected $client;

    public function __construct($cliendId)
    {
        $this->client = Client::find($cliendId);
    }

    /**
     * @param Row $row
     */
    public function onRow(Row $row)
    {
        // $rowIndex = $row->getIndex();
        $row      = $row->toArray();
        // $userId = Auth::user()->id;

        $this->client->accounts()->create([
            'process' => $row['proceso'],
            'identification' => $row['cedularuc'],
            'name' => $row['nombre_cliente'],
            'stage' => $row['etapa'],
            'principal_amount' => (double) $row['capital'],
        ]);
    }

    public function sheets(): array
    {
        return [
            0 => new CoerciveAccountsImport($this->client->id),
        ];
    }
}
