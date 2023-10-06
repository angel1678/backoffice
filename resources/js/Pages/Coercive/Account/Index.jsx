import React, { useState, useEffect, useLayoutEffect } from 'react';
import { router } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, client, accounts, options, errors, ...props }) {
  const classHeader = '!text-center text-lg';
  const classBody = '!text-center';

  const breadCrumb = [
    { label: 'Coactiva', icon: 'coactiva' },
    { label: client.name }
  ];

  const [hasFilter, setHasFilter] = useState(false);
  const [filters, setFilters] = useState({
    stage: props?.stage ? Number(props?.stage) : null,
    search: props?.search
  });

  const handleRefresh = () => router.reload();
  const handleCreate = () => router.visit(route('coercive.clients.accounts.create', client.id));
  const handleDetalle = (id) => {
    console.log(route('coercive.clients.accounts.edit', [client.id, id]));
    router.visit(route('coercive.clients.accounts.edit', [client.id, id]));
  };
  const handleUpdate = (id) => router.put(route('coercive.clients.accounts.update', [client.id, id]));
  const handlePage = (page) => {
    const data = Object.fromEntries(Object.entries({ page, ...filters })
      .filter(([_, v]) => v != null && v != ''));
    router.get(route('coercive.clients.accounts.index', client.id), data, { preserveState: true })
  };

  const handleChange = (e) => {
    setHasFilter(true);
    setFilters(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const bodyAcciones = (data) => (
    <div className="flex gap-1 justify-center m-1">
      {auth.isAdmin &&
        <SecondaryButton
          severe="help"
          icon={classNames('fas fa-lg', !data.is_active ? 'fa-check' : 'fa-times')}
          onClick={() => handleUpdate(data.id)}
          tooltip={!data.is_active ? 'Activar' : 'Inactivar'}
          tooltipOptions={{ position: 'bottom' }}
        />
      }
      <SecondaryButton
        severe="info"
        icon="fas fa-folder fa-lg"
        onClick={() => handleDetalle(data.id)}
      />
    </div>
  );

  useEffect(() => {
    if (hasFilter) handlePage(1);
  }, [hasFilter, filters]);

  return (
    <AuthenticatedLayout
      auth={auth}
      title="Coactiva"
      errors={errors}
      breadCrumb={breadCrumb}
    >
      <div>
        <div className="p-2 text-gray-900">
          <div className="flex justify-between mb-2">
            <div className="flex gap-2">
              <div>
                <span className="p-input-icon-right">
                  <i className="pi pi-search" />
                  <InputText
                    className="block"
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
            </div>
            <div className="flex gap-2">
              <SecondaryButton icon="fas fa-refresh" onClick={handleRefresh} />
              {auth.isAdmin &&
                <>
                  <PrimaryButton icon="fas fa-plus" label="Agregar" onClick={handleCreate} />
                  <form action={route('coercive.clients.accounts.export', client.id)} method='get'>
                    {
                      Object.keys(filters).map(key => (
                        <input type="hidden" name={key} value={filters[key]} />
                      ))
                    }
                    <PrimaryButton icon="fas fa-download" label="Descargar" type="submit" />
                  </form>
                </>
              }
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow-md rounded-xl mt-4 pt-4 px-4">
            <DataTable
              value={accounts.data}
              scrollable
              scrollHeight="calc(100vh - 19rem)"
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
              <Column field="process" header="Proceso" headerClassName={classHeader} />
              <Column field="identification" header="Ci / RUC" headerClassName={classHeader} />
              <Column field="name" header="Nombre del deudor" headerClassName={classHeader} />
              <Column field="principal_amount" header="Capital" headerClassName={classHeader} />
              <Column field="stage_name" header="Etapa" headerClassName={classNames(classHeader, 'w-72')} />
              {auth.isAdmin &&
                <Column field="executive_name" header="Ejecutivo" headerClassName={classHeader} />
              }
              <Column body={({ is_active }) => is_active ? 'Activo' : 'Inactivo'} header="Estado" headerClassName={classHeader} />
              <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
            </DataTable>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
