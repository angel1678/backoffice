import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';

export default function Index({ auth, clients, errors, ...props }) {
  const classButton = '!text-sm h-9 uppercase';
  const classHeader = 'text-center';
  const classBody = '!text-center';

  const handlePage = (page) => { };

  const handleRefresh = () => router.reload();
  const handleCreate = () => router.visit(route('coercive.clients.create'));
  const handleUpdate = (id) => { };
  const handleDelete = (id) => { };

  const bodyActivo = (data) => <i className={classNames('fas', data.is_active ? 'fa-check' : 'fa-times')}></i>;
  const bodyAcciones = (data) => (
    <div className="flex gap-1 justify-center m-1">
      <Button
        icon={classNames('fas fa-md', !data.activo ? 'fa-check' : 'fa-times')}
        className="p-button-secondary h-8"
        onClick={() => handleUpdate(data.id)}
        tooltip={!data.activo ? 'Activar' : 'Inactivar'}
        tooltipOptions={{ position: 'bottom' }}
      />
      <Button
        icon="fas fa-trash fa-md"
        className="p-button-danger h-8"
        onClick={() => handleDelete(data.id)}
        tooltip="Eliminar"
        tooltipOptions={{ position: 'bottom' }}
      />
    </div>
  );

  return (
    <AuthenticatedLayout
      auth={auth}
      title="Cliente de Coactiva"
      errors={errors}
    >
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-2 text-gray-900">
          <div className="flex justify-between mb-2">
            <div className="flex gap-2"></div>
            <div className="flex gap-2">
              <Button icon="fas fa-refresh fa-lg" className={classNames(classButton, 'p-button-help')} onClick={handleRefresh} />
              <Button icon="fas fa-plus fa-lg" className={classButton} label="Agregar" onClick={handleCreate} />
            </div>
          </div>
          <DataTable
            value={clients.data}
            showGridlines
            scrollable
            scrollHeight="calc(100vh - 170px)"
            size="small"
            emptyMessage="No existen resultados"

            dataKey="id"
            lazy
            paginator
            rows={100}
            totalRecords={clients.total}
            onPage={e => handlePage(e.page + 1)}
          >
            <Column field="name" header="Nombre" headerClassName={classNames(classHeader, 'w-64')} bodyClassName={classBody} />
            <Column field="description" header="Descripción" headerClassName={classHeader} bodyClassName={classBody} />
            <Column body={bodyActivo} header="Activo" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
            <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
          </DataTable>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
