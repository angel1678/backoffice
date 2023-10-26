<?php

namespace App\Http\Controllers\Proceso;

use App\Events\ProcesoDetalleComentarioEvent;
use App\Models\User;
use App\Notifications\CommentNotification;
use App\Rules\NickNameRule;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ProcesoDetalle;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

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
        $data = (object) $request->validate([
            'comment' => 'required|string',
            'nicksName' => [
                'required',
                new NickNameRule
            ],
        ]);

        DB::beginTransaction();
        try {
            $comment = $detalle->comentarios()->create([
                'description' => $data->comment,
                'user_id' => Auth::id(),
            ]);

            collect($data->nicksName)->each(function ($nickname) use ($detalle, $comment) {
                $user = User::where('nickname', Str::replace('@', '', $nickname))->first();
                $comment->menciones()->create([
                    'user_id' => $user->id,
                ]);

                //TODO: Enviar notificaciones por usuario.
                $user->notify(new CommentNotification($detalle, $comment));
                broadcast(new ProcesoDetalleComentarioEvent($detalle, $comment))->toOthers();
            });
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

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
