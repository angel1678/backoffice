<?php

namespace App\Http\Controllers\Judicial;

use App\Enums\ProcessStatus;
use App\Models\User;
use App\Models\Proceso;
use App\Models\ProcesoMovimiento;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ShowProcessMovimientController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Proceso $process, ProcesoMovimiento $movimient)
    {
        $associates = $movimient->proceso->associates()->select('id', 'name')->get();
        $detalle = $movimient->detalle()->with('comments')->orderBy('fecha', 'desc')->get();
        $ownerId = $movimient->proceso->user_id;
        $users = User::where('id', '<>', Auth::id())->dropdown()->get();
        $client = $process->client;

        $process->loadMissing(['actors', 'defendants']);

        $documents = session('documents');
        $documentSelected = session('documentSelected');
        $comments = session('comments');

        return inertia('Judicial/Movimient/Show', [
            'associates' => $associates,
            'detalle' => $detalle,
            'documents' => $documents,
            'documentSelected' => $documentSelected,
            'movimiento' => $movimient,
            'ownerId' => $ownerId,
            'users' => $users,
            'client' => $client,
            'process' => $process,
            'comments' => $comments,
        ]);
    }
}
