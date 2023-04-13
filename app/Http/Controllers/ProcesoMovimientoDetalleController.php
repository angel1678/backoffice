<?php

namespace App\Http\Controllers;

use App\Models\Proceso;
use App\Models\ProcesoMovimiento;
use Illuminate\Http\JsonResponse;

class ProcesoMovimientoDetalleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Proceso $proceso, ProcesoMovimiento $movimiento): JsonResponse
    {
        return response()->json($movimiento->detalle()->orderBy('fecha', 'desc')->get());
    }
}
