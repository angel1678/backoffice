<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use App\Models\Proceso;
use App\Models\ProcesoDetalle;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = (object) Auth::user();
        $numeroRegistros = Configuracion::getParam('proceso', 'ultimas_actualizaciones')->first();

        $query = Proceso::query();
        $query->join('procesos_movimiento as pm', function (JoinClause $join) {
            $join->on('pm.proceso_id', 'procesos.id')
                ->whereRaw("pm.id = (select movimiento_id from procesos_detalle pd1 where pd1.movimiento_id in (select id from procesos_movimiento pm1 where pm1.proceso_id = procesos.id) order by fecha desc limit 1)");
        })->join('procesos_detalle as pd', function (JoinClause $join) {
            $join->on('pd.movimiento_id', 'pm.id')
                ->whereRaw("pd.id = (select id from procesos_detalle pd2 where pd2.movimiento_id = pm.id order by fecha desc limit 1)");
        })->join('users as u', 'u.id', 'procesos.user_id')
        ->when($user->isNotAn('admin'), function ($query) use ($user) {
            $query->where(function ($query) use ($user) {
                $query->where('procesos.user_id', $user->id)
                    ->orWhereRelation('associates', 'user_id', $user->id);
            });
        })
        ->select('pd.titulo', 'pd.fecha', 'procesos.accion_infraccion', 'u.name as user_name', 'procesos.*', 'pd.movimiento_id')
        ->limit($numeroRegistros->valor);
        $movimientos = $query->get();

        return Inertia::render('Dashboard', [
            'movimientos' => $movimientos,
        ]);
    }
}
