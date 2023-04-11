<?php

namespace App\Http\Controllers;

use App\Imports\ProcesoImport;
use App\Models\Proceso;
use App\Models\ProcesoDetalle;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProcesoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = User::find(Auth::id());

        $query = Proceso::query();
        $query->when($user->isNotAn('admin'), function ($query) use ($user) {
            return $query->where('user_id', $user->id);
        });
        $query->when($user->isAn('admin'), function ($query) use ($user) {
            return $query->orderBy('user_id');
        });
        $procesos = $query->get();

        return Inertia::render('Proceso/Index', [
            'procesos' => $procesos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Proceso/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $userId = Auth::user()->id;
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

        Proceso::create([
            'judicatura_id' => $data['judicaturaId'],
            'anio_id' => $data['anioId'],
            'numero_id' => $data['numeroId'],
            'user_id' => $userId
        ]);

        return redirect()->route('proceso.index');
    }

    public function batchStore(Request $request): RedirectResponse
    {
        $file = $request->file('fileProcesos');
        $import = new ProcesoImport();
        $import->import($file);

        if ($import->errors()->count() > 0) {
            return back()
                ->withErrors($import->errors()->toArray());
        }

        return redirect()->route('proceso.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Proceso $proceso): RedirectResponse
    {
        $proceso->activo = !$proceso->activo;
        $proceso->save();

        return redirect()->route('proceso.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proceso $proceso): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $movimientos = $proceso->movimientos;
            foreach ($movimientos as $movimiento) {
                $movimiento->detalle()->delete();
                $movimiento->delete();
            }

            $proceso->delete();

            DB::commit();
            return redirect()->route('proceso.index');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
