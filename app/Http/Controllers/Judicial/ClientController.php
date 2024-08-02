<?php

namespace App\Http\Controllers\Judicial;

use Inertia\Response;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Models\JudicialClient;
use App\Data\JudicialClientData;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        session()->reflash();
        $models = JudicialClient::paginate(10);

        return inertia('Judicial/Client/Index', [
            'models' => $models,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $companies = Company::get()->map(fn ($user) => [
            'label' => $user->name,
            'value' => $user->id
        ]);

        return inertia('Judicial/Client/Create', [
            'companies' => $companies,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JudicialClientData $data)
    {
        DB::beginTransaction();
        try {
            $client = JudicialClient::create($data->toArray());
            DB::commit();

            session()->flash('clientSelected', $client->id);
            return $this->redirectWithMessage('judicial.process.create', 'El cliente fue creado exitosamente.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->backWarning('Ocurrio un error al momento de crear el cliente.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(JudicialClient $judicialClient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JudicialClient $judicialClient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JudicialClient $judicialClient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JudicialClient $judicialClient)
    {
        //
    }
}
