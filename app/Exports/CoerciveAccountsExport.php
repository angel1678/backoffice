<?php

namespace App\Exports;

use App\Casts\CurrencyFormat;
use App\Models\CoerciveAccount;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CoerciveAccountsExport implements FromCollection, WithMapping, WithHeadings
{
    public function __construct(
        protected $cliendId,
        protected $stageId,
        protected $search
    ) { }

    public function map($account): array
    {
        return [
            $account->client_name,
            $account->process,
            $account->identification,
            $account->name,
            $account->stage_name,
            $account->principal_amount,
            $account->observation,
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
            'Observacion'
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
