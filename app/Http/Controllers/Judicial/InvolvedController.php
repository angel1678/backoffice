<?php

namespace App\Http\Controllers\Judicial;

use App\Data\JudicialInvolvedData;
use App\Http\Controllers\Controller;
use App\Models\JudicialInvolved;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvolvedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $defendantsType = $request->type == 'defendant'
            ? Type::group('DEFENDANT_TYPE')->get()
            : [];

        return back()->with('defendantsType', $defendantsType);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JudicialInvolvedData $data)
    {
        $type = ($data->type == 50) ? 'actor' : 'demandado';

        DB::beginTransaction();
        try {
            JudicialInvolved::create($data->toArray());
            DB::commit();
            return $this->backSuccess("El {$type} fue creado exitosamente.");
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->backWarning("Ocurrio un error al momento de crear el {$type}.");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(JudicialInvolved $judicialInvolved)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JudicialInvolved $judicialInvolved)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JudicialInvolved $judicialInvolved)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JudicialInvolved $judicialInvolved)
    {
        //
    }
}
