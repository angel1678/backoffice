import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Auth } from '@/types';

import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';

type Props = {
  auth: Auth;
  value: any;
  filters: any;
  rows: number;
  first: number;
  totalRecords: number;
  isLastUpdates: boolean;
  isCrud: boolean;
  urlDownload: string;
  onPage: (page: number, filters?: any) => void;
  onLastUpdates: () => void;
  onMovimiento: (id: string) => void;
};

const status = [
  { label: 'Activo', value: '1' },
  { label: 'Inactivo', value: '0' },
];

export default function DataTableProceso({
  auth, value, filters: filtersProp, rows, first, totalRecords, isLastUpdates, isCrud, urlDownload, onPage, onLastUpdates, onMovimiento
}: Props) {
  const classHeader = '!text-center text-lg';
  const classBody = '!text-center';

  const [hasFilter, setHasFilter] = useState(false);
  const [filters, setFilters] = useState({
    stage: filtersProp.stage,
    search: filtersProp.search
  });

  // @ts-ignore
  const handleChange = (e) => {
    setHasFilter(true);
    setFilters(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleRefresh = () => router.reload();
  const handleCreate = () => router.visit(route('proceso.create'));
  const handleEdit = (id: string) => router.visit(route('proceso.edit', id));
  const handleUpdate = (id: string) => router.put(route('proceso.update', id));
  const handleDelete = (id: string) => router.delete(route('proceso.destroy', id));

  const handleLastUpdates = () => onLastUpdates && onLastUpdates();
  const handleMovimiento = (id: string) => onMovimiento && onMovimiento(id);

  const bodyActivo = (data: any) => <i className={classNames('fas', data.activo ? 'fa-check' : 'fa-times')}></i>;
  const bodyAcciones = (data: any) => (
    <div className="flex gap-1 justify-center m-1">
      <SecondaryButton icon="fas fa-folder fa-lg" severe="info" onClick={() => handleMovimiento(data.id)} />
      {
        (auth.isAdmin && isCrud) &&
        <SecondaryButton
          icon="fas fa-pencil fa-lg"
          onClick={() => handleEdit(data.id)}
          tooltip="editar"
          tooltipOptions={{ position: 'bottom' }}
        />
      }
      {
        (!auth.isAdmin && isCrud && auth.user.id == data.user_id) &&
        <Button
          icon={classNames('fas fa-lg', !data.activo ? 'fa-check' : 'fa-times')}
          onClick={() => handleUpdate(data.id)}
          tooltip={!data.activo ? 'Activar' : 'Inactivar'}
          tooltipOptions={{ position: 'bottom' }}
        />
      }
      {/* {
        (isCrud && (auth.isAdmin || auth.user.id == data.user_id)) &&
        <SecondaryButton
          icon="fas fa-trash fa-lg"
          severe="help"
          onClick={() => handleDelete(data.id)}
          tooltip="Eliminar"
          tooltipOptions={{ position: 'bottom' }}
        />
      } */}
    </div>
  );

  useEffect(() => {
    if (hasFilter) onPage(1, filters);
  }, [hasFilter, filters]);

  return (
    <>
      <div className="flex justify-between mb-2">
        <div className="flex gap-2">
          {
            isLastUpdates &&
            <SecondaryButton
              icon="fas fa-newspaper"
              label="Ultimas Actualizaciones"
              onClick={handleLastUpdates}
            />
          }
          <div>
            <span className="p-input-icon-right">
              <i className="pi pi-search" />
              <InputText
                name="search"
                className="block"
                placeholder="Buscar"
                value={filters.search}
                onChange={handleChange}
              />
            </span>
          </div>
          <Dropdown
            name="statu"
            placeholder="Selecione un estado"
            options={status}
            showClear
            value={filters.statu}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2">
          <SecondaryButton icon="fas fa-refresh" onClick={handleRefresh} />
          {isCrud && (
            <>
              <PrimaryButton icon="fas fa-plus" label="Agregar nuevo cliente" />
              <PrimaryButton icon="fas fa-plus" label="Agregar proceso" onClick={handleCreate} />
            </>
          )}
          {
            auth.isAdmin && urlDownload &&
            <form action={urlDownload} method="get">
              {
                Object.keys(filters).map(key => (
                  <input key={key} type="hidden" name={key} value={filters[key]} />
                ))
              }
              <PrimaryButton icon="fas fa-download" label="Descargar" type="submit" />
            </form>
          }
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow-md rounded-xl mt-4 pt-4 px-4">
        <DataTable
          value={value}
          scrollable
          scrollHeight="calc(100vh - 275px)"
          emptyMessage="No existen resultados"

          lazy
          paginator
          rows={rows}
          first={first}
          totalRecords={totalRecords}
          onPage={e => onPage((e.page || 0) + 1)}
        >
          <Column field="codigo_proceso" header="Numero del Proceso" headerClassName={classNames(classHeader, 'w-72')} bodyClassName={classBody} />
          <Column header="Cliente" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
          <Column header="Actor" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
          <Column header="Demandado" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
          <Column header="Tipo de Procedimiento" headerClassName={classNames(classHeader, 'w-72')} bodyClassName={classBody} />
          <Column header="Etapa procesal" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
          {
            auth.isAdmin &&
            <Column field="user_name" header="Usuario" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
          }
          <Column header="Estatus" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
          {/* <Column field="executed_at" header="Fecha actualización" headerClassName={classNames(classHeader, 'w-72')} bodyClassName={classBody} />
          <Column field="accion_infraccion" header="Estado actual" headerClassName={classHeader} bodyClassName={classBody} /> */}

          {/* <Column body={bodyActivo} header="Activo" headerClassName={classHeader} bodyClassName={classBody} /> */}
          <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
        </DataTable>
      </div>
    </>
  )
}

// DataTableProceso.propsTypes = {
//   auth: PropTypes.object,
//   value: PropTypes.array,
//   filters: PropTypes.object,
//   rows: PropTypes.number,
//   first: PropTypes.number,
//   totalRecords: PropTypes.number,
//   isLastUpdates: PropTypes.bool,
//   isCrud: PropTypes.bool,
//   urlDownload: PropTypes.string,
//   onPage: PropTypes.func,
//   onLastUpdates: PropTypes.func,
//   onMovimiento: PropTypes.func
// }
