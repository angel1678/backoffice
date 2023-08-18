<?php

namespace App\Imports;

use App\Models\Coactiva;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Row;

class CoactivaImport implements OnEachRow, WithHeadingRow, SkipsOnError, WithMultipleSheets
{
    use Importable, SkipsErrors;

    /**
     * @param Row $row
     */
    public function onRow(Row $row)
    {
        // $rowIndex = $row->getIndex();
        $row      = $row->toArray();
        // $userId = Auth::user()->id;

        Coactiva::create([
            'proceso' => $row['proceso'],
            'identificacion' => $row['cedularuc'],
            'nombre' => $row['nombre_cliente'],
            'etapa' => $row['etapa'],
            'capital' => $row['capital'],
        ]);
    }

    public function sheets(): array
    {
        return [
            0 => new CoactivaImport(),
        ];
    }
}
