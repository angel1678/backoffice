<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(): Response
    {
        $configuraciones = Configuracion::all()->flatMap(function ($item) {
            return ["{$item->grupo}:{$item->parametro}" => $item];
        });

        return Inertia('Setting/Edit', ['model' => $configuraciones]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'proceso:ultimas_actualizaciones' => 'required|min:1',
            'proceso:casos_detenidos' => 'required|min:1',
        ]);

        Configuracion::getParam('proceso', 'ultimas_actualizaciones')
            ->update(['valor' => $data['proceso:ultimas_actualizaciones']]);

        Configuracion::getParam('proceso', 'casos_detenidos')
            ->update(['valor' => $data['proceso:casos_detenidos']]);

        return redirect()->route('setting.edit');
    }
}
