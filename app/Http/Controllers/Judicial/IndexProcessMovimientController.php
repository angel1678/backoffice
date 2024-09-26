<?php

namespace App\Http\Controllers\Judicial;

use App\Http\Controllers\Controller;
use App\Models\Proceso;
use Illuminate\Http\Request;

class IndexProcessMovimientController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Proceso $process)
    {
        $movimients = $process
            ->movimientos()
            ->orderBy('fecha')
            ->get();

        return back()->with('movimients', $movimients);
    }
}
