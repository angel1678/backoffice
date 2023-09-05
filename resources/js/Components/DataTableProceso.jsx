import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const status = [
  { label: 'Activo', value: '1' },
  { label: 'Inactivo', value: '0' },
];

export default function DataTableProceso({ auth, value, filterSearch, filterStatu, rows, first, totalRecords, isLastUpdates, isCrud, onPage, onLastUpdates, onMovimiento }) {
  const classButton = '!text-sm h-9 uppercase';
  const classHeader = 'text-center';
  const classBody = '!text-center';

  const [statu, setStatu] = useState(filterStatu);
  const [search, setSearch] = useState(filterSearch || '');

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
        (!auth.isAdmin && isCrud && auth.user.id == data.user_id) &&
        <Button
          icon={classNames('fas fa-md', !data.activo ? 'fa-check' : 'fa-times')}
          className="p-button-secondary h-8"
          onClick={() => handleUpdate(data.id)}
          tooltip={!data.activo ? 'Activar' : 'Inactivar'}
          tooltipOptions={{ position: 'bottom' }}
        />
      }
      {
        (isCrud && (auth.isAdmin || auth.user.id == data.user_id)) &&
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
            <Button icon="fas fa-newspaper fa-lg" className={classNames(classButton, 'p-button-info justify-self-start')} label="Ultimas Actualizaciones" onClick={handleLastUpdates} />
          }
          <div>
            <span className="p-input-icon-right">
              <i className="pi pi-search" />
              <InputText
                className="h-9 block"
                placeholder="Buscar"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  onPage(1, statu, e.target.value);
                }}
              />
            </span>
          </div>
          <Dropdown
            placeholder="Selecione un estado"
            options={status}
            showClear
            value={statu}
            onChange={(e) => {
              setStatu(e.value);
              onPage(1, e.value, search)
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button icon="fas fa-refresh fa-lg" className={classNames(classButton, 'p-button-help')} onClick={handleRefresh} />
          {
            isCrud &&
            <Button icon="fas fa-plus fa-lg" className={classButton} label="Agregar" onClick={handleCreate} />
          }
        </div>
      </div>

      <DataTable
        value={value}
        scrollable
        scrollHeight="calc(100vh - 275px)"
        size="small"
        showGridlines
        emptyMessage="No existen resultados"

        lazy
        paginator
        rows={rows}
        first={first}
        totalRecords={totalRecords}
        onPage={e => onPage(e.page + 1)}
      >
        {
          auth.isAdmin &&
          <Column field="user_name" header="Usuario" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
        }
        <Column field="codigo_proceso" header="Codigo del Proceso" headerClassName={classNames(classHeader, 'w-72')} bodyClassName={classBody} />
        <Column field="executed_at" header="Fecha actualización" headerClassName={classNames(classHeader, 'w-72')} bodyClassName={classBody} />
        <Column field="accion_infraccion" header="Estado actual" headerClassName={classHeader} bodyClassName={classBody} />

        <Column body={bodyActivo} header="Activo" headerClassName={"classHeader"} bodyClassName={classBody} />
        <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
      </DataTable>
    </>
  )
}
