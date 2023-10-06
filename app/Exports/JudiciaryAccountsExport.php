<?php

namespace App\Exports;

use App\Models\Configuracion;
use App\Models\Proceso;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class JudiciaryAccountsExport implements FromCollection, WithMapping, WithHeadings
{
    protected $isDetained;
    protected $statu;
    protected $search;

    public function __construct($statu, $search, $isDetained = false)
    {
        $this->isDetained = $isDetained;
        $this->statu = $statu;
        $this->search = $search;
    }

    public function map($account): array
    {
        return [
            $account->user_name,
            $account->codigo_proceso,
            $account->executed_at,
            $account->accion_infraccion,
            $account->activo ? 'Activo' : 'Inactivo',
        ];
    }

    public function headings(): array
    {
        return [
            'Usuario',
            'Codigo del Proceso',
            'Fecha actualizacion',
            'Estado actual',
            'Activo',
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $user = (object) Auth::user();
        $statu = $this->statu;
        $search = $this->search;

        $query = Proceso::when($statu != null, function ($query) use ($statu) {
            $query->where('activo', $statu);
        })->when(!empty($search), function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query->whereRaw("CONCAT(judicatura_id, '-', anio_id, '-', numero_id) like '{$search}%'")
                    ->orWhere('accion_infraccion', 'like', "{$search}%");
            });
        })->when($user->isAn('admin'), function ($query) {
            $query->orderBy('user_id');
        });

        if ($this->isDetained) {
            $tiempoCasoDetenido = Configuracion::getParam('proceso', 'casos_detenidos')->first();
            $query->ultimaFechaDetalle(Carbon::now()->subDays($tiempoCasoDetenido->valor));
        }

        return $query->get();
    }
}
