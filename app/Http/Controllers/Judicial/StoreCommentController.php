<?php

namespace App\Http\Controllers\Judicial;

use App\Models\User;
use App\Models\Proceso;
use App\Rules\NickNameRule;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ProcesoDetalle;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Notifications\CommentNotification;
use App\Events\ProcesoDetalleComentarioEvent;

class StoreCommentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $judicial)
    {
        $data = (object) $request->validate([
            'type' => ['required', 'string'],
            'comment' => ['required', 'string'],
            'nicksName' => ['required_if:type,detail', 'nullable', 'array', new NickNameRule]
        ]);

        DB::beginTransaction();
        try {
            $model = $data->type == 'detail'
                ? ProcesoDetalle::class
                : Proceso::class;

            $model = $model::find($judicial);
            $comment = $model->comments()->create([
                'description' => $data->comment,
                'user_id' => Auth::id(),
            ]);

            if ($data->type == 'detail') {
                collect($data->nicksName)->each(function ($nickname) use ($model, $comment) {
                    $user = User::where('nickname', Str::replace('@', '', $nickname))->first();
                    $comment->menciones()->create([
                        'user_id' => $user->id,
                    ]);

                    //TODO: Enviar notificaciones por usuario.
                    $user->notify(new CommentNotification($model, $comment));
                    broadcast(new ProcesoDetalleComentarioEvent($model, $comment))->toOthers();
                });
            }
            DB::commit();

            $comments = $model->comments()->get();

            return back()->with('comments', $comments);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
