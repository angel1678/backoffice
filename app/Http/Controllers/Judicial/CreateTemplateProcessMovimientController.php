<?php

namespace App\Http\Controllers\Judicial;

use App\Http\Controllers\Controller;
use App\Models\Configuracion;
use App\Models\ProcesoMovimiento;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreateTemplateProcessMovimientController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ProcesoMovimiento $movimient)
    {
        $templates = Template::dropdown()
            ->get();

        $references = Configuracion::getGroup('template')->get();
        $configurations = $references
            ->map(fn($item) => [$item->parametro => $item->valor])
            ->flatMap(fn($values) => $values);

        $template = session('template');
        $urlTemplate = session('urlTemplate');

        return inertia('Judicial/Template/Create', [
            'judicialMovimientId' => $movimient->id,
            'templates' => $templates,
            'template' => $template,
            'urlTemplate' => $urlTemplate,
            'references' => $configurations,
        ]);
    }
}
