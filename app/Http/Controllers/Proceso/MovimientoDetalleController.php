<?php

namespace App\Http\Controllers\Proceso;

use App\Http\Controllers\Controller;
use App\Models\ProcesoMovimiento;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovimientoDetalleController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(ProcesoMovimiento $movimiento)
    {
        $detalle = $movimiento->detalle;

        return Inertia::render('ProcesoMovimientoDetalle/Index', [
            'movimiento' => $movimiento,
            'detalle' => $detalle,
        ]);
    }
}
