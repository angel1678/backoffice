<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use App\Models\Proceso;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProcesoDetenidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $statu = $request->input('statu');
        $search = $request->input('search');
        $tiempoCasoDetenido = Configuracion::getParam('proceso', 'casos_detenidos')->first();

        $query = Proceso::query();
        $query->when($statu != null, function ($query) use ($statu) {
            $query->where('activo', $statu);
        })->when(!empty($search), function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query->whereRaw("CONCAT(judicatura_id, '-', anio_id, '-', numero_id) like '{$search}%'")
                    ->orWhere('procesos.accion_infraccion', 'like', "{$search}%");
            });
        })->ultimaFechaDetalle(Carbon::now()->subDays($tiempoCasoDetenido->valor));

        $procesos = $query->paginate(100);

        return Inertia::render('ProcesoDetenido/Index', [
            'procesos' => $procesos,
            'search' => $search,
            'statu' => $statu,
        ]);
    }
}
