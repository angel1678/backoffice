<?php

namespace App\Exports;

use App\Enums\ProcessStatus;
use App\Models\Proceso;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ReportAccountExport implements FromCollection, WithMapping, WithHeadings
{

    protected $data;

    public function __construct(object $data)
    {
        $this->data = $data;
    }

    public function map($account): array
    {
        return [
            $account->client->name,
            $account->user_name,
            $account->process,
            $account->actor_names,
            $account->defendant_names,
            $account->type_procedure,
            $account->procedural_stage,
            $account->status_name,
        ];
    }

    public function headings(): array
    {
        return [
            'Cliente',
            'Usuario',
            'Proceso',
            'Actores',
            'Demandados',
            'Tipo de Proceso',
            'Estado del Proceso',
            'Estado',
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $data = $this->data;

        $query = Proceso::query();
        $query
            ->when(!empty($data->clientId), function ($query) use ($data) {
                $query->where('client_id', $data->clientId);
            })
            ->when(!empty($data->procedureTypeId), function ($query) use ($data) {
                $query->where('type_of_procedure_id', $data->procedureTypeId);
            })
            ->when(!empty($data->statusId), function ($query) use ($data) {
                $query->where('status', $data->statusId);
            })
            ->when(!empty($data->userId), function ($query) use ($data) {
                $query->where('user_id', $data->userId);
            })
            ->when(!empty($data->report), function ($query) use ($data) {
                $query
                    ->when($data->report == 'activos', function ($query) {
                        $query->where('status', ProcessStatus::activo);
                    })
                    ->when($data->report == 'pasivos', function ($query) {
                        $query->where('status', ProcessStatus::pasivo);
                    })
                    ->when($data->report == 'congelados', function ($query) {
                        $query->where('status', ProcessStatus::congelado);
                    })
                    ->when($data->report == 'nocongelados', function ($query) {
                        $query->whereIn('status', [ProcessStatus::activo, ProcessStatus::pasivo]);
                    });
            });

        return $query->get();
    }
}
