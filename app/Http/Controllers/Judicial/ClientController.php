<?php

namespace App\Http\Controllers\Judicial;

use App\Models\User;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\JudicialClient;
use App\Data\JudicialClientData;
use App\Http\Controllers\Controller;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
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
        $users = User::get()->map(fn ($user) => [
            'label' => $user->name,
            'value' => $user->id
        ]);

        return inertia('Judicial/Client/Create', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JudicialClientData $data)
    {
        JudicialClient::create($data->toArray());

        return back();
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
