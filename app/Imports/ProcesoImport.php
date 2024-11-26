<?php

namespace App\Imports;

use App\Enums\DefendantType;
use App\Enums\PersonInvolved;
use App\Enums\PersonWhoPays;
use App\Enums\RelevantInformation;
use App\Models\Proceso;
use Maatwebsite\Excel\Row;
use Illuminate\Support\Str;
use App\Models\ProcedureType;
use App\Models\JudicialClient;
use App\Models\JudicialInvolved;
use App\Models\PersonWhoBilled;
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

        [$judicatura, $anio, $numero] = explode('-', $row['numero_de_proceso']);
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
            ->where(DB::raw('upper(name)'), Str::upper($row['tipo_de_procedimiento']));
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

        $personWhoPays = PersonWhoBilled::where(DB::raw('upper(name)'), Str::upper($row['persona_que_factura']))
            ->first();
        if (empty($personWhoPays)) {
            $personWhoPays = PersonWhoBilled::create(['name' => Str::upper($row['persona_que_factura']), 'is_visible' => false]);
        }

        $proceso = Proceso::create([
            'judicatura_id'         => $judicatura,
            'anio_id'               => $anio,
            'numero_id'             => $numero,
            'client_id'             => $client->id,
            'person_who_pays'       => $personWhoPays->id,
            'number_operation'      => $row['operacion'],
            'amount'                => $row['cuantia'],
            'identification'        => $row['cedula_del_demandado'],
            'type_of_procedure_id'  => $procedimiento->id,
            'procedural_stage_id'   => $etapaProcesal->id,
            'user_id'               => $this->userId,
            'relevant_information'  => RelevantInformation::NA,
        ]);

        $proceso->involved()->create([
            'type' => PersonInvolved::ACTOR,
            'name' => $row['clienteactor'],
        ]);

        $proceso->involved()->create([
            'type' => PersonInvolved::DEMANDADO,
            'defendant_type' => DefendantType::DEUDOR_PRINCIPAL,
            'name' => $row['demandado'],
        ]);
    }
}
