import React from 'react';
import { Dialog } from 'primereact/dialog';

const DialogMovimientoDetalle = ({ model = [], visible, onHide }) => {
  return (
    <Dialog header="Procesos Judiciales \ Movimientos \ Detalle" visible={visible} className="w-4/5" onHide={onHide}>
      <table className="table-auto w-full border-collapse border border-slate-400">
        <thead>
          <tr>
            <th class="border border-slate-300 p-2 w-40">Fecha</th>
            <th class="border border-slate-300 p-2 w-56">Titulo</th>
            <th class="border border-slate-300 p-2">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {
            model.map(detalle => (
              <tr key={detalle.id}>
                <td class="border border-slate-300 px-2 text-sm align-top">{detalle.fecha}</td>
                <td class="border border-slate-300 px-2 text-sm align-top">{detalle.titulo}</td>
                <td class="border border-slate-300 px-2 text-sm align-top">{detalle.comentario}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Dialog>
  )
}

export default DialogMovimientoDetalle
