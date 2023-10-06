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

    protected function getContacts($items, $isAdrress = false)
    {
        return collect([0, 1, 2])->map(function ($i) use ($items, $isAdrress) {
            if ($isAdrress && !empty($items[$i])) {
                return "{$items[$i]->location} / {$items[$i]->value}";
            }
            return $items[$i]->value ?? '';
        });
    }

    public function map($account): array
    {
        $contacts = $account->contacts()
            ->where('is_active', true)
            ->get();

        $contactsData = [];
        collect([1, 2, 3, 4, 5, 6])->each(function ($typeId) use ($contacts, &$contactsData) {
            $values = $contacts->where('type_id', $typeId)->pluck('data');
            $contactsData = [
                ...$contactsData,
                ...$this->getContacts($values, collect([5, 6])->contains($typeId))
            ];
        });

        return [
            $account->client_name,
            $account->process,
            $account->identification,
            $account->name,
            $account->stage_name,
            $account->principal_amount,
            $account->observation,
            ...$contactsData,
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
            'TelefonoFijo_1',
            'TelefonoFijo_2',
            'TelefonoFijo_3',
            'TelefonoCelular_1',
            'TelefonoCelular_2',
            'TelefonoCelular_3',
            'TelefonoTrabajo_1',
            'TelefonoTrabajo_2',
            'TelefonoTrabajo_3',
            'Correo_1',
            'Correo_2',
            'Correo_3',
            'DireccionCasa_1',
            'DireccionCasa_2',
            'DireccionCasa_3',
            'DireccionTrabajo_1',
            'DireccionTrabajo_2',
            'DireccionTrabajo_3',
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
