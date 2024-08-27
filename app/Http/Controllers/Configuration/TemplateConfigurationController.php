<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use App\Models\Template;
use App\Models\TemplateParam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TemplateConfigurationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = Template::paginate();

        return inertia('Configuration/Template/Index', [
            'model' => $templates,
            'urlPrev' => route('judicial.template.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $params = TemplateParam::where('is_active', true)
            ->select('key as value', 'name as label')
            ->get();

        return inertia('Configuration/Template/Create', [
            'params' => $params,
            'urlPrev' => route('configuration.template.index'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = (object) $request->validate([
            'name' => 'required|string',
            'text' => 'required|string',
        ]);

        DB::beginTransaction();
        try {
            Template::create([
                'name' => $data->name,
                'template' => $data->text,
            ]);
            DB::commit();

            return $this->backSuccess('La plantilla fue creada exitosamente.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->backWarning('Hubo un error al momento de crear la plantilla.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Template $template)
    {
        $params = TemplateParam::where('is_active', true)
            ->select('key as value', 'name as label')
            ->get();

        return inertia('Configuration/Template/Edit', [
            'params' => $params,
            'urlPrev' => route('configuration.template.index'),
            'model' => $template,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Template $template)
    {
        $data = (object) $request->validate([
            'name' => 'required|string',
            'text' => 'required|string',
        ]);

        DB::beginTransaction();
        try {
            $template->fill([
                'name' => $data->name,
                'template' => $data->text,
            ]);
            if ($template->isDirty()) {
                $template->save();
            }

            DB::commit();
            return $this->backSuccess('La plantilla fue editada exitosamente.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->backWarning('Hubo un error al momento de editar la plantilla.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Template $template)
    {
        $template->delete();
        return $this->backSuccess('La plantilla fue eliminada');
    }
}
