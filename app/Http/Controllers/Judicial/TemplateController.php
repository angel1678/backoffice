<?php

namespace App\Http\Controllers\Judicial;

use Carbon\Carbon;
use App\Models\Proceso;
use App\Models\Template;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\TemplateParam;
use Illuminate\Http\Response;
use App\Traits\CreateFileTrait;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Data\JudicialProcessTemplateData;
use App\Models\Configuracion;
use App\Models\ProcesoMovimiento;

class TemplateController extends Controller
{
    use CreateFileTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Judicial/Template/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $movimients = ProcesoMovimiento::has('proceso')
            ->whereHas('proceso', function ($query) {
                $query->where('user_id', Auth::id());
            })->get()
            ->map(fn($item) => ['value' => $item->id, 'label' => "{$item->proceso->process} - {$item->dependencia_jurisdiccional}"]);

        $templates = Template::dropdown()
            ->get();

        $references = Configuracion::getGroup('template')->get();
        $configurations = $references
            ->map(fn($item) => [$item->parametro => $item->valor])
            ->flatMap(fn($values) => $values);

        $template = session('template');
        $urlTemplate = session('urlTemplate');

        return inertia('Judicial/Template/Create', [
            'movimients' => $movimients,
            'templates' => $templates,
            'template' => $template,
            'urlTemplate' => $urlTemplate,
            'references' => $configurations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = (object) $request->validate([
            'judicialMovimientId' => 'required',
            'templateId' => 'required',
            'text' => 'required',
        ]);

        $procesoMovimiento = ProcesoMovimiento::find($data->judicialMovimientId);
        $template = Template::find($data->templateId);

        $fileName = Str::replace(' ', '_', $template->name) . '_' . Carbon::now()->format('Ymdhis');
        $this->generateTemplatePDF($data, $template, $fileName, "/{$procesoMovimiento->proceso->process}", 'google');
        return $this->backSuccess('El documento se genero y guardo exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Template $template)
    {
        $data = (object) $request->validate([
            'judicialMovimientId' => 'required|string',
        ]);

        $procesoMovimiento = ProcesoMovimiento::find($data->judicialMovimientId);
        $form = $this->generateTemplate($template, $procesoMovimiento);

        return back()->with('template', $form);
    }
}
