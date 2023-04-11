import React, { useState } from 'react';
import axios from 'axios';
import ReactHtmlParser from '@orrisroot/react-html-parser';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import DialogMovimientoDetalle from './DialogMovimientoDetalle';

const DialogMovimiento = ({ proceso, model = [], visible, onHide }) => {
  const [dialog, setDialog] = useState(false);
  const [detalle, setDetalle] = useState([]);

  const handleDetalle = async (movimiento) => {
    const { data } = await axios.get(route('proceso.movimiento.detalle', { proceso, movimiento }));
    setDetalle(data);
    setDialog(true);
  }

  return (
    <>
      <DialogMovimientoDetalle model={detalle} visible={dialog} onHide={() => setDialog(false)} />
      <Dialog header="Procesos Judiciales \ Movimientos" visible={visible} className="w-4/5" onHide={onHide}>
        <table className="table-auto w-full border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2 w-40">Fecha</th>
              <th className="border border-slate-300 p-2 w-14">Numero Ingreso</th>
              <th className="border border-slate-300 p-2 w-64">Dependencia jurisdiccional</th>
              <th className="border border-slate-300 p-2 w-32">Actor / Ofendido</th>
              <th className="border border-slate-300 p-2 w-40">Accion / Infraccion</th>
              <th className="border border-slate-300 p-2">Demandado / Procesado</th>
              <th className="border border-slate-300 p-2 w-22">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              model.map(movimiento => (
                <tr key={movimiento.id}>
                  <td className="border border-slate-300 px-2 text-center text-sm">{movimiento.fecha}</td>
                  <td className="border border-slate-300 px-2 text-center">{movimiento.numero_ingreso}</td>
                  <td className="border border-slate-300 px-2 text-center text-sm">{movimiento.dependencia_jurisdiccional}</td>
                  <td className="border border-slate-300 px-2 text-center text-sm">{movimiento.actor_ofendido}</td>
                  <td className="border border-slate-300 px-2 text-center text-sm">{movimiento.accion_infraccion}</td>
                  <td className="border border-slate-300 px-2 text-sm">{ReactHtmlParser(movimiento.demandado_procesado)}</td>
                  <td className="border border-slate-300 text-center">
                    <div className="flex gap-1 justify-center">
                      <Button icon="fas fa-folder fa-md" className="p-button-info" onClick={() => handleDetalle(movimiento.id)} />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Dialog>
    </>
  )
}

export default DialogMovimiento
