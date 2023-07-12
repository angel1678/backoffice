<?php

namespace App\Http\Controllers\Proceso;

use App\Http\Controllers\Controller;
use App\Models\ProcesoDetalle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DetalleComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ProcesoDetalle $detalle): RedirectResponse
    {
        $request->validate([
            'comment' => 'required|string',
        ]);

        $detalle->comentarios()->create([
            'description' => $request->comment,
            'user_id' => Auth::id(),
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }
}
