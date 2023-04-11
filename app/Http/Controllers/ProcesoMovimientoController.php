<?php

namespace App\Http\Controllers;

use App\Models\Proceso;
use Illuminate\Http\JsonResponse;

class ProcesoMovimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Proceso $proceso): JsonResponse
    {
        $movimientos = $proceso
            ->movimientos
            ->map(function ($movimiento) {
                $demandado = preg_split('/\r\n|\r|\n/', $movimiento->demandado_procesado);
                $demandado = collect($demandado)->map(fn($data) => "<li>{$data}</li>")->join(' ');
                $movimiento->demandado_procesado = "<ul>{$demandado}</lu>";
                return $movimiento;
            });

        return response()->json($movimientos);
    }
}
