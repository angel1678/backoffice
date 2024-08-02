<?php

namespace App\Http\Controllers\Judicial;

use App\Http\Controllers\Controller;
use App\Models\Proceso;
use Illuminate\Http\Request;

class IndexProcessMovimientController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Proceso $process)
    {
        $movimients = $process
            ->movimientos
            ->map(function ($movimiento) {
                $demandado = preg_split('/\r\n|\r|\n/', $movimiento->demandado_procesado);
                $demandado = collect($demandado)->map(fn ($data) => "<li>{$data}</li>")->join(' ');
                $movimiento->demandado_procesado = "<ul>{$demandado}</lu>";
                return $movimiento;
            });

        return back()->with('movimients', $movimients);
    }
}
