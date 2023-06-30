<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use App\Models\ProcesoDetalle;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProcesoDetalleLastUpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $user = User::find(Auth::id());
        $numeroRegistros = Configuracion::getParam('proceso', 'ultimas_actualizaciones')->first();

        $detalle = ProcesoDetalle::join('procesos_movimiento as pm', 'procesos_detalle.movimiento_id', 'pm.id')
            ->join('procesos as p', 'pm.proceso_id', 'p.id')
            ->join('users as u', 'u.id', 'p.user_id')
            ->orderBy('procesos_detalle.fecha', 'desc')
            ->select('procesos_detalle.*', 'p.judicatura_id', 'p.anio_id', 'p.numero_id', 'u.name as user_name')
            ->when($user->isNotAn('admin'), function ($query) use ($user) {
                return $query->where('p.user_id', $user->id);
            })
            ->limit($numeroRegistros->valor)
            ->get();

        return response()->json($detalle);
    }
}
