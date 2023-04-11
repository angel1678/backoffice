import React from 'react';
import classNames from 'classnames';
import { router } from '@inertiajs/react';
import { Button } from 'primereact/button';

const ProcesoItem = ({auth, proceso, onMovimiento }) => {

  const handleMovimiento = () => onMovimiento && onMovimiento(proceso.id);
  const handleUpdate = () => router.put(route('proceso.update', proceso.id));
  const handleDelete = () => router.delete(route('proceso.destroy', proceso.id));

  return (
    <tr>
      {
        auth.isAdmin &&
        <td className="border border-slate-300 text-center">{proceso.user_name}</td>
      }
      <td className="border border-slate-300 text-center">{proceso.judicatura_id}</td>
      <td className="border border-slate-300 text-center">{proceso.anio_id}</td>
      <td className="border border-slate-300 text-center">{proceso.numero_id}</td>
      <td className="border border-slate-300 text-center">{proceso.executed_at}</td>
      <td className="border border-slate-300 text-center text-sm">{proceso.accion_infraccion}</td>
      <td className="border border-slate-300 text-center">
        <i className={classNames('fas', proceso.activo ? 'fa-check' : 'fa-times')}></i>
      </td>
      <td className="border border-slate-300 text-center">
        <div className="flex gap-1 justify-center m-1">
          <Button icon="fas fa-folder fa-md" className="p-button-info" onClick={handleMovimiento} />
          <Button
            icon={classNames('fas fa-md', !proceso.activo ? 'fa-check' : 'fa-times')}
            className="p-button-secondary"
            onClick={handleUpdate}
            tooltip={!proceso.activo ? 'Activar' : 'Inactivar'}
            tooltipOptions={{ position: 'bottom' }}
          />
          <Button
            icon="fas fa-trash fa-md"
            className="p-button-danger"
            onClick={handleDelete}
            tooltip="Eliminar"
            tooltipOptions={{ position: 'bottom' }}
          />
        </div>
      </td>
    </tr>
  )
}

export default ProcesoItem;
