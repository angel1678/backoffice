import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';

export default function DataTableProceso({ auth, modal, isLastUpdates, isCrud, onLastUpdates, onMovimiento }) {
  const classButton = 'text-xs font-semibold tracking-widest uppercase h-8';
  const classHeader = 'text-center';
  const classBody = '!text-center';

  const handleRefresh = () => router.reload();
  const handleCreate = () => router.visit(route('proceso.create'));
  const handleEdit = (id) => router.visit(route('proceso.edit', id));
  const handleUpdate = (id) => router.put(route('proceso.update', id));
  const handleDelete = (id) => router.delete(route('proceso.destroy', id));

  const handleLastUpdates = () => onLastUpdates && onLastUpdates();
  const handleMovimiento = (id) => onMovimiento && onMovimiento(id);

  const bodyActivo = (data) => <i className={classNames('fas', data.activo ? 'fa-check' : 'fa-times')}></i>;
  const bodyAcciones = (data) => (
    <div className="flex gap-1 justify-center m-1">
      <Button icon="fas fa-folder fa-md" className="p-button-info h-8" onClick={() => handleMovimiento(data.id)} />
      {
        (auth.isAdmin && isCrud) &&
        <Button
          icon="fas fa-pencil"
          className="p-button-secondary h-8"
          onClick={() => handleEdit(data.id)}
          tooltip="editar"
          tooltipOptions={{ position: 'bottom' }}
        />
      }
      {
        (!auth.isAdmin && isCrud) &&
        <Button
          icon={classNames('fas fa-md', !data.activo ? 'fa-check' : 'fa-times')}
          className="p-button-secondary h-8"
          onClick={() => handleUpdate(data.id)}
          tooltip={!data.activo ? 'Activar' : 'Inactivar'}
          tooltipOptions={{ position: 'bottom' }}
        />
      }
      {
        isCrud &&
        <Button
          icon="fas fa-trash fa-md"
          className="p-button-danger h-8"
          onClick={() => handleDelete(data.id)}
          tooltip="Eliminar"
          tooltipOptions={{ position: 'bottom' }}
        />
      }
    </div>
  );

  return (
    <>
      <div className="flex justify-between mb-2">
        <div className="flex gap-2">
          {
            isLastUpdates &&
            <Button icon="fas fa-newspaper fa-lg" className={classNames(classButton, 'p-button-info justify-self-start')} label="Ultimas actualizaciones" onClick={handleLastUpdates} />
          }
        </div>
        <div className="flex gap-2">
          <Button icon="fas fa-refresh fa-lg" className={classNames(classButton, 'p-button-help')} onClick={handleRefresh} />
          {
            isCrud &&
            <Button icon="fas fa-plus fa-lg" className={classButton} label="Agregar" onClick={handleCreate} />
          }
        </div>
      </div>

      <DataTable value={modal} scrollable scrollHeight="calc(100vh - 275px)" size="small" emptyMessage="No existen resultados">
        {
          auth.isAdmin &&
          <Column field="user_name" header="Usuario" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
        }
        <Column field="judicatura_id" header="Codigo de judicatura" headerClassName={classHeader} bodyClassName={classBody} />
        <Column field="anio_id" header="Año" headerClassName={classHeader} bodyClassName={classBody} />
        <Column field="numero_id" header="No. Secuencial" headerClassName={classHeader} bodyClassName={classBody} />
        <Column field="executed_at" header="Fecha actualización" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        <Column field="accion_infraccion" header="Estado actual" headerClassName={classHeader} bodyClassName={classBody} />

        <Column body={bodyActivo} header="Activo" headerClassName={classHeader} bodyClassName={classBody} />
        <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
      </DataTable>
    </>
  )
}
