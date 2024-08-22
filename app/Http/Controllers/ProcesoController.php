<?php

namespace App\Http\Controllers;

use App\Imports\ProcesoImport;
use App\Models\Proceso;
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
    public function index(Request $request): Response
    {
        $user = (object) Auth::user();
        $statu = $request->input('statu');
        $search = $request->input('search');

        $query = Proceso::query();
        $query->when($user->isNotAn('admin'), function ($query) use ($user) {
            $query->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereRelation('associates', 'user_id', $user->id);
            });
        })->when($statu != null, function ($query) use ($statu) {
            $query->where('activo', $statu);
        })->when(!empty($search), function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query->whereRaw("CONCAT(judicatura_id, '-', anio_id, '-', numero_id) like '{$search}%'")
                    ->orWhere('accion_infraccion', 'like', "{$search}%");
            });
        })->when($user->isAn('admin'), function ($query) {
            $query->orderBy('user_id');
        });

        $procesos = $query->paginate(100);

        return Inertia::render('Proceso/Index', [
            'procesos' => $procesos,
            'search' => $search,
            'statu' => $statu,
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
     * Display the specified resource.
     */
    public function show(Proceso $proceso)
    {
        return response()->json($proceso);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proceso $proceso): Response
    {
        $model = [
            'id' => $proceso->id,
            'judicaturaId' => $proceso->judicatura_id,
            'anioId' => $proceso->anio_id,
            'numeroId' => $proceso->numero_id,
            'userId' => $proceso->user_id,
            'activo' => $proceso->activo
        ];

        $users = User::select('id as value', 'name as label')->get();
        return Inertia::render('Proceso/Edit', [
            'users' => $users,
            'model' => $model
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proceso $proceso): RedirectResponse
    {
        $user = User::find(Auth::id());

        if ($user->isAn('admin')) {
            $data = $request->validate([
                'userId' => 'required|exists:users,id',
                'activo' => 'boolean'
            ]);

            $proceso->user_id = $data['userId'];
            $proceso->activo = $data['activo'];
            $proceso->save();
        }

        if ($user->isNotAn('admin')) {
            $proceso->activo = !$proceso->activo;
            $proceso->save();
        }

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
                $detalles = $movimiento->detalle();
                foreach ($detalles as $detalle) {
                    $detalle->comments()->delete();
                    $detalle->delete();
                }
                $movimiento->delete();
            }

            $proceso->associates()->detach();

            $proceso->delete();

            DB::commit();
            return redirect()->route('proceso.index');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
