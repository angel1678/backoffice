<?php

namespace App\Http\Controllers\Judicial;

use App\Http\Controllers\Controller;
use App\Models\ProcesoDetalle;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Notification;

class ShowNotificationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(DatabaseNotification $notification)
    {
        $data = (object) $notification->data;
        $detail = ProcesoDetalle::find($data->id);

        $movimient = $detail->movimiento_id;
        $process = $detail->movimiento->proceso_id;

        $notification->markAsRead();

        return redirect()->route('judicial.movimient.show', [
            'process' => $process,
            'movimient' => $movimient,
        ]);
    }
}
