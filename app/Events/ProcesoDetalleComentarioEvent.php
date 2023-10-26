<?php

namespace App\Events;

use App\Models\ProcesoComentario;
use App\Models\ProcesoDetalle;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProcesoDetalleComentarioEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public ProcesoDetalle $detalle;
    public ProcesoComentario $comentario;

    /**
     * Create a new event instance.
     */
    public function __construct(ProcesoDetalle $detalle, ProcesoComentario $comentario)
    {
        $this->detalle = $detalle;
        $this->comentario = $comentario;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("movimiento_{$this->detalle->movimiento_id}"),
        ];
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'detalle_id' => $this->detalle->id,
            'comentario' => $this->comentario,
        ];
    }
}
