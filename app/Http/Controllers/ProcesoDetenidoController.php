<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use App\Models\Proceso;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ProcesoDetenidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tiempoCasoDetenido = Configuracion::getParam('proceso', 'casos_detenidos')->first();
        $procesos = Proceso::ultimaFechaDetalle(Carbon::now()->subDays($tiempoCasoDetenido->valor))->get();

        return Inertia::render('ProcesoDetenido/Index', [
            'procesos' => $procesos,
        ]);
    }
}
