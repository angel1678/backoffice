<?php

namespace App\Imports;

use App\Models\Proceso;
use Maatwebsite\Excel\Row;
use Illuminate\Support\Str;
use App\Models\ProcedureType;
use App\Models\JudicialClient;
use App\Models\JudicialInvolved;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProcesoImport implements OnEachRow, WithHeadingRow, SkipsOnError
{
    use Importable, SkipsErrors;

    protected $clientId;

    protected $userId;

    public function __construct($clientId, $userId)
    {
        $this->clientId = $clientId;
        $this->userId = $userId;
    }

    /**
     * @param Row $row
     */
    public function onRow(Row $row)
    {
        $rowIndex = $row->getIndex();
        $row      = $row->toArray();

        [$judicatura, $anio, $numero] = explode('-', $row['proceso']);
        if (
            Proceso::where([
                ['judicatura_id', $judicatura],
                ['anio_id', $anio],
                ['numero_id', $numero]
            ])->exists()
        ) {
            $this->errors["{$rowIndex}-duplicate"] = "En la fila {$rowIndex}, ya existe un proceso registrado con el codigo {$judicatura}-{$anio}-{$numero}";
            return null;
        }

        $client = JudicialClient::find($this->clientId);
        if (empty($client)) {
            $this->errors["{$rowIndex}-client"] = "En la fila {$rowIndex}, el cliente {$this->clientId} no existe";
            return null;
        }

        $procedimiento = ProcedureType::whereNull('parent_id')
            ->where(DB::raw('upper(name)'), Str::upper($row['procedimiento']));
        if (!$procedimiento->exists()) {
            $this->errors["{$rowIndex}-procedure"] = "En la fila {$rowIndex}, el procedimiento {$row['procedimiento']} no existe";
            return null;
        }
        $procedimiento = $procedimiento->first();

        $etapaProcesal = ProcedureType::whereNotNull('parent_id')
            ->where(DB::raw('upper(name)'), Str::upper($row['etapa_procesal']));
        if (!$etapaProcesal->exists()) {
            $this->errors["{$rowIndex}-status"] = "En la fila {$rowIndex}, la etapa procesal {$row['etapa_procesal']} no existe";
            return null;
        }
        $etapaProcesal = $etapaProcesal->first();

        $proceso = Proceso::create([
            'judicatura_id'         => $judicatura,
            'anio_id'               => $anio,
            'numero_id'             => $numero,
            'client_id'             => $client->id,
            'number_operation'      => $row['operacion'],
            'amount'                => $row['cuantia'],
            'identification'        => $row['identificacion_demandado'],
            'type_of_procedure_id'  => $procedimiento->id,
            'procedural_stage_id'   => $etapaProcesal->id,
            'user_id'               => $this->userId,
        ]);

        $proceso->associates()->attach($this->userId);

        if (!empty($row['demandado'])) {
            $demandado = JudicialInvolved::where('name', $row['demandado'])
                ->where('type', 51);
            if (!$demandado->exists()) {
                $demandado = JudicialInvolved::create([
                    'type' => 51,
                    'name' => $row['demandado'],
                ]);
            } else {
                $demandado = $demandado->first();
            }
            $proceso->involved()->sync([$demandado->id]);
        }
    }
}
