<?php

namespace App\Http\Controllers\Judicial;

use App\Data\JudicialProcessResource;
use Inertia\Response;
use App\Models\Proceso;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\JudicialClient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class ProcesoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $user = (object) Auth::user();
        $status = $request->input('status');
        $search = $request->input('search');

        $query = Proceso::query();
        $query->when($user->isNotAn('admin'), function ($query) use ($user) {
            $query->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereRelation('associates', 'user_id', $user->id);
            });
        })->when($status != null, function ($query) use ($status) {
            $query->where('activo', $status);
        })->when(!empty($search), function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query->whereRaw("CONCAT(judicatura_id, '-', anio_id, '-', numero_id) like '{$search}%'")
                    ->orWhere('accion_infraccion', 'like', "{$search}%");
            });
        })->when($user->isAn('admin'), function ($query) {
            $query->orderBy('user_id');
        });

        $procesos = $query->paginate(100);
        $procesos = JudicialProcessResource::collect($procesos);

        return inertia('Judicial/Proceso/Index', [
            'procesos' => $procesos,
            'search' => $search,
            'status' => $status,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $clients = JudicialClient::get()->map(fn ($client) => [
            'label' => $client->name,
            'value' => $client->id,
        ]);

        return inertia('Judicial/Proceso/Create', [
            'clients' => $clients,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = Auth::id();
        $data = $request->validate([
            'judicaturaId' => 'required|max:5',
            'anioId' => 'required|max:4',
            'numeroId' => 'required|max:5',
        ]);

        if (Proceso::where([
            ['judicatura_id', $data['judicaturaId']],
            ['anio_id', $data['anioId']],
            ['numero_id', $data['numeroId']]
        ])->exists()) {
            return back()
                ->withInput()
                ->withErrors([
                    'duplicate' => "Ya existe un proceso registrado con el codigo {$data['judicaturaId']}-{$data['anioId']}-{$data['numeroId']}"
                ]);
        }

        $proceso = Proceso::create([
            'judicatura_id' => $data['judicaturaId'],
            'anio_id' => $data['anioId'],
            'numero_id' => $data['numeroId'],
            'user_id' => $userId
        ]);

        $proceso->associates()->attach($userId);

        return redirect()->route('judicial.proceso.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Proceso $proceso)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proceso $proceso)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proceso $proceso)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proceso $proceso)
    {
        //
    }
}
