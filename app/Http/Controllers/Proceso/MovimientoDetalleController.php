<?php

namespace App\Http\Controllers\Proceso;

use App\Http\Controllers\Controller;
use App\Models\ProcesoMovimiento;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MovimientoDetalleController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(ProcesoMovimiento $movimiento)
    {
        $users = User::where('id', '<>', Auth::id())->select('id as value', 'name as label')->get();
        $detalle = $movimiento->detalle()->with('comentarios')->orderBy('fecha', 'desc')->get();
        $associates = $movimiento->proceso->associates()->select('id', 'name')->get();

        $ownerId = $movimiento->proceso->user_id;

        return Inertia::render('ProcesoMovimientoDetalle/Index', [
            'ownerId' => $ownerId,
            'movimiento' => $movimiento,
            'detalle' => $detalle,
            'users' => $users,
            'associates' => $associates,
        ]);
    }
}
