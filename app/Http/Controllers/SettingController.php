<?php

namespace App\Http\Controllers;

use App\Models\Configuracion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

use function Amp\ByteStream\split;

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
        $validation = ['number' => 'required|min:1', 'text' => 'required|string'];

        $configurations = Configuracion::get()
            ->map(fn($item) => ["{$item->grupo}:{$item->parametro}" => $validation[$item->tipo]])
            ->flatMap(fn($item) => $item)
            ->toArray();

        $data = $request->validate($configurations);

        collect($data)->each(function ($item, $key) {
            [$grupo, $proceso] = explode(':', $key);

            Configuracion::getParam($grupo, $proceso)
                ->update(['valor' => $item]);
        });

        return redirect()->route('setting.edit');
    }
}
