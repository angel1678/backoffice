<?php

namespace App\Exports;

use App\Casts\CurrencyFormat;
use App\Casts\Json;
use App\Models\CoerciveAccount;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CoerciveAccountsExport implements FromCollection, WithMapping, WithHeadings
{
    protected $cliendId;
    protected $stageId;
    protected $search;

    public function __construct($cliendId, $stageId, $search)
    {
        $this->cliendId = $cliendId;
        $this->stageId = $stageId;
        $this->search = $search;
    }

    public function map($account): array
    {
        $phonesContact = $account->contacts()
            ->where('is_active', true)
            ->whereIn('type_id', [1, 2, 3])
            ->pluck('data');

        $emailsContact = $account->contacts()
            ->where('is_active', true)
            ->where('type_id', 4)
            ->pluck('data');

        return [
            $account->client_name,
            $account->process,
            $account->identification,
            $account->name,
            $account->stage_name,
            $account->principal_amount,
            $account->observation,
            $phonesContact[0]->value ?? '',
            $phonesContact[1]->value ?? '',
            $phonesContact[2]->value ?? '',
            $emailsContact[0]->value ?? '',
            $emailsContact[1]->value ?? '',
            $emailsContact[2]->value ?? '',
        ];
    }

    public function headings(): array
    {
        return [
            'Cliente',
            'Proceso',
            'Identificacion',
            'Deudor',
            'Etapa',
            'Capital',
            'Observacion',
            'Telefono_1',
            'Telefono_2',
            'Telefono_3',
            'Correo_1',
            'Correo_2',
            'Correo_3',
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $stageId = $this->stageId;
        $clientId = $this->cliendId;
        $search = $this->search;

        $query = CoerciveAccount::query();
        $query->when(!empty($stageId), function ($query) use ($stageId) {
            $query->where('stage_id', $stageId);
        })->when(!empty($clientId), function ($query) use($clientId) {
            $query->where('client_id', $clientId);
        })->when(!empty($search), function ($query) use($search) {
            $query->where(function ($query) use($search) {
                $query->where('process', 'like', "%{$search}%")
                    ->orWhere('identification', 'like', "{$search}%")
                    ->orWhere('name', 'like', "%{$search}%");
            });
        })->withCasts([
            'principal_amount' => CurrencyFormat::class
        ]);

        return $query->get();
    }
}
