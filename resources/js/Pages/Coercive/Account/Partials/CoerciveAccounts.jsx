import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, accounts, options, errors, ...props }) {
  const classButton = '!text-sm h-9 uppercase';
  const classHeader = 'text-center';
  const classBody = '!text-center';

  const [filters, setFilters] = useState({
    client: props?.client ? Number(props?.client) : null,
    stage: props?.stage ? Number(props?.stage) : null,
    search: props?.search
  });

  const handleRefresh = () => router.reload();
  const handleCreate = () => router.visit(route('coercive.accounts.create'));
  const handleDetalle = (id) => router.visit(route('coercive.accounts.show', id));
  const handleUpdate = (id) => router.put(route('coercive.accounts.update', id));
  const handlePage = (page) => {
    const data = Object.fromEntries(Object.entries({ page, ...filters })
      .filter(([_, v]) => v != null && v != ''));
    router.get(route('coercive.accounts.index'), data, { preserveState: true })
  };

  const handleChange = (e) => {
    setFilters(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const bodyAcciones = (data) => (
    <div className="flex gap-1 justify-center m-1">
      {auth.isAdmin &&
        <Button
          icon={classNames('fas fa-md', !data.is_active ? 'fa-check' : 'fa-times')}
          className="p-button-secondary h-8"
          onClick={() => handleUpdate(data.id)}
          tooltip={!data.is_active ? 'Activar' : 'Inactivar'}
          tooltipOptions={{ position: 'bottom' }}
        />
      }
      <Button icon="fas fa-folder fa-md" className="p-button-info h-8" onClick={() => handleDetalle(data.id)} />
    </div>
  );

  useEffect(() => {
    handlePage(1);
  }, [filters]);

  return (
    <AuthenticatedLayout
      auth={auth}
      title="Coactiva"
      errors={errors}
    >
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-2 text-gray-900">
          <div className="flex justify-between mb-2">
            <div className="flex gap-2">
              <div>
                <span className="p-input-icon-right">
                  <i className="pi pi-search" />
                  <InputText
                    className="h-9 block"
                    placeholder="Buscar"
                    name="search"
                    value={filters.search}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <Dropdown
                className="w-72"
                placeholder="Selecione una etapa"
                options={options?.stages}
                showClear
                name="stage"
                value={filters.stage}
                onChange={handleChange}
              />
              <Dropdown
                className="w-72"
                placeholder="Selecione un cliente"
                options={options?.clients}
                showClear
                name="client"
                value={filters.client}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2">
              <Button icon="fas fa-refresh fa-lg" className={classNames(classButton, 'p-button-help')} onClick={handleRefresh} />
              {auth.isAdmin &&
                <>
                  <Button icon="fas fa-plus fa-lg" className={classButton} label="Agregar" onClick={handleCreate} />
                  <form action={route('coercive.accounts.export')} method='get'>
                    {
                      Object.keys(filters).map(key => (
                        <input type="hidden" name={key} value={filters[key]} />
                      ))
                    }
                    <Button icon="fas fa-download fa-lg" className={classButton} label="Descargar" type="submit" />
                  </form>
                </>
              }
            </div>
          </div>
          <DataTable
            value={accounts.data}
            showGridlines
            scrollable
            scrollHeight="calc(100vh - 170px)"
            size="small"
            emptyMessage="No existen resultados"

            dataKey="id"
            lazy
            paginator
            rows={100}
            first={accounts.from}
            totalRecords={accounts.total}
            onPage={e => handlePage(e.page + 1)}
          >
            <Column field="client_name" header="Cliente" />
            <Column field="process" header="Proceso" />
            <Column field="identification" header="Ci / RUC" />
            <Column field="name" header="Nombre del deudor" />
            <Column field="principal_amount" header="Capital" />
            <Column field="stage_name" header="Etapa" headerClassName={classNames(classHeader, 'w-72')} />
            {auth.isAdmin &&
              <Column field="executive_name" header="Ejecutivo" />
            }
            <Column body={({ is_active }) => is_active ? 'Activo' : 'Inactivo'} header="Estado" />
            <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
          </DataTable>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
