<?php

namespace App\Http\Controllers\Configuration;

use Illuminate\Http\Request;
use App\Models\ProcedureType;
use App\Http\Controllers\Controller;

class ProceduralStageConfigurationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $typeProcedures = ProcedureType::whereNull('parent_id')
            ->dropdown()
            ->get();

        $proceduralStage = null;
        if ($request->has('procedureType')) {
            $proceduralStage = ProcedureType::where('parent_id', $request->procedureType)
                ->dropdown()
                ->get();
        }

        return inertia('Configuration/ProceduralStage/Index', [
            'typeProcedures' => $typeProcedures,
            'proceduralStage' => $proceduralStage,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ProcedureType $procedureType)
    {
        $data = (object) $request->validate([
            'name' => 'required|string'
        ]);

        if ($procedureType) {
            $procedureType->items()->create(['name' => $data->name]);
        } else {
            ProcedureType::create(['name' => $data->name]);
        }

        return $this->backSuccess('El tipo fue creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProcedureType $procedureType)
    {
        $proceduralStage = ProcedureType::where('parent_id', $procedureType->id)
            ->dropdown()
            ->get();

        return back()->with('proceduralStage', $proceduralStage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProcedureType $procedureType)
    {
        $data = (object) $request->validate([
            'name' => 'required|string'
        ]);

        $procedureType->name = $data->name;
        if ($procedureType->isDirty()) {
            $procedureType->save();
        }

        return $this->backSuccess('El tipo fue actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProcedureType $procedureType)
    {
        if ($procedureType->items()->count() > 0) {
            return $this->backWarning('El tipo no se puede eliminar.');
        }

        $procedureType->delete();
        return $this->backSuccess('El tipo se elimino exitosamente.');
    }
}
