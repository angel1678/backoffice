<?php

namespace App\Imports;

use App\Models\Proceso;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Row;

class ProcesoImport implements OnEachRow, WithHeadingRow, SkipsOnError
{
    use Importable, SkipsErrors;

    /**
     * @param Row $row
     */
    public function onRow(Row $row)
    {
        $rowIndex = $row->getIndex();
        $row      = $row->toArray();
        $userId = Auth::user()->id;

        if (
            Proceso::where([
                ['judicatura_id', $row['judicatura']],
                ['anio_id', $row['ano']],
                ['numero_id', $row['numero']]
            ])->exists()
        ) {
            $this->errors["{$rowIndex}-duplicate"] = "En la fila {$rowIndex}, ya existe un proceso registrado con el codigo {$row['judicatura']}-{$row['ano']}-{$row['numero']}";
            return null;
        }

        $proceso = Proceso::create([
           'judicatura_id'  => $row['judicatura'],
           'anio_id'        => $row['ano'],
           'numero_id'      => $row['numero'],
           'user_id'        => $userId,
        ]);

        $proceso->associates()->attach($userId);
    }
}
