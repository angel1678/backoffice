<?php

namespace App\Jobs;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Bus\Queueable;
use App\Models\ProcesoDetalle;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use App\Notifications\JudicialActionNotification;

class JudicialNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        ProcesoDetalle::where('send_notification', true)
            ->whereNull('sended_at')
            ->each(function ($procesoDetalle) {
                /** @var User */
                $user = $procesoDetalle
                    ->movimiento
                    ->proceso
                    ->user;

                $user->notify(new JudicialActionNotification($procesoDetalle));
                $procesoDetalle->sended_at = Carbon::now();
                $procesoDetalle->save();
            });
    }
}
