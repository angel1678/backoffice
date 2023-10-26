<?php

namespace App\Notifications;

use App\Models\ProcesoComentario;
use App\Models\ProcesoDetalle;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Broadcasting\PrivateChannel;

class CommentNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public ProcesoDetalle $detalle;
    public ProcesoComentario $comentario;
    public string $message;

    /**
     * Create a new notification instance.
     */
    public function __construct(ProcesoDetalle $detalle, ProcesoComentario $comentario)
    {
        $codigoProceso = $detalle->movimiento->proceso->codigo_proceso;

        $this->detalle = $detalle;
        $this->comentario = $comentario;
        $this->message = "Tienes una tarea en el proceso {$codigoProceso}";
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the brodcast representation of the notification.
     */
    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'movimientoId' => $this->detalle->movimiento_id,
            'comentarioId' => $this->comentario->id,
            'message' => $this->message,
            'event' => class_basename($this),
        ]);
    }

    public function toArray($notifiable)
    {
        return [
            'movimientoId' => $this->detalle->movimiento_id,
            'comentarioId' => $this->comentario->id,
            'message' => $this->message,
            'event' => class_basename($this),
        ];
    }
}
