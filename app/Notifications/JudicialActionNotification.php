<?php

namespace App\Notifications;

use Carbon\Carbon;
use App\Models\Proceso;
use Illuminate\Support\Str;
use Illuminate\Bus\Queueable;
use App\Models\ProcesoDetalle;
use App\Models\ProcesoMovimiento;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class JudicialActionNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected ProcesoDetalle $procesoDetalle;

    protected ProcesoMovimiento $procesoMovimiento;

    protected Proceso $proceso;

    protected string $codigo;

    /**
     * Create a new notification instance.
     */
    public function __construct(ProcesoDetalle $procesoDetalle)
    {
        $this->procesoDetalle = $procesoDetalle;
        $this->procesoMovimiento = $procesoDetalle->movimiento;
        $this->proceso = $this->procesoMovimiento->proceso;

        $this->codigo = "{$this->proceso->judicatura_id}{$this->proceso->anio_id}{$this->proceso->numero_id}";
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $fecha = Carbon::now()->format('Y-m-d H:i:s');
        $subject = "{$this->codigo} - {$fecha} - {$this->procesoDetalle->titulo} - {$this->procesoMovimiento->dependencia_jurisdiccional} - {$this->procesoMovimiento->accion_infraccion}";

        return (new MailMessage)
            ->subject($subject)
            ->view('emails.judicial.actionNotification', [
                'demandados' => Str::replace('\n', ', ', $this->procesoMovimiento->demandados),
                'comentario' => $this->procesoDetalle->comentario,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $fecha = Carbon::now()->format('d/m/Y H:i:s');
        return [
            'id' => $this->procesoDetalle->id,
            // 'movimientoId' => $this->procesoDetalle->movimiento_id,
            // 'procesoId' => $this->procesoDetalle->movimiento->proceso_id,
            'proceso' => $this->codigo,
            'fecha' => $fecha,
            'titulo' => $this->procesoDetalle->titulo,
            'accion_infraccion' => $this->procesoMovimiento->accion_infraccion,
            'user_name' => $this->proceso->user_name,
        ];
    }
}
