import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { classNames } from 'primereact/utils';

import DataTable from '@/Components/DataTable';
import SecondaryButton from '@/Components/SecondaryButton';
// import DialogMovimiento from '@/Components/DialogMovimiento';
// import DataTableProceso from '@/Components/DataTableProceso';
// import DialogLastUpdate from '@/Components/DialogLastUpdate';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import PrimaryButton from '@/Components/PrimaryButton';

type Props = PageProps & {
  procesos: any;
};

const optionsStatus = [
  { label: 'Activo', value: '1' },
  { label: 'Inactivo', value: '0' },
];

export default function Proceso({ app, auth, errors, procesos, search, status }: Props) {
  const breadCrumb = [
    { label: 'Judicial', icon: 'judicial' },
    { label: 'Todos los procesos' }
  ];

  const [hasFilter, setHasFilter] = useState(false);
  const [filters, setFilters] = useState({ statu: '', search: '' });

  const classHeader = '!text-center text-lg';
  const classBody = '!text-center';

  const [dialog, setDialog] = useState(false);
  const [procesoId, setProcesoId] = useState([]);
  const [movimiento, setMovimiento] = useState([]);

  const [dialogLastUpdate, setDialogLastUpdate] = useState(false);
  const [lastDetalle, setLastDetalle] = useState([]);

  // const handleLastUpdates = async () => {
  //   const { data } = await axios.get(route('proceso-last-update.index'));
  //   setLastDetalle(data);
  //   setDialogLastUpdate(true);
  // };

  // const handleShowMovimientos = async (id) => {
  //   const { data } = await axios.get(route('proceso.movimiento', id));
  //   setProcesoId(id);
  //   setMovimiento(data);
  //   setDialog(true);
  // };

  const handlePage = (page: number, filters?: any) => {
    const data: any = Object.fromEntries(Object.entries({ page, ...filters })
      .filter(([_, v]) => (v != null && v != '')));
    router.get(route('proceso.index'), data, { preserveState: true });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
    setHasFilter(true);
    setFilters(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleRefresh = () => router.reload();
  const handleCreateClient = () => router.visit(route('judicial.client.create'));
  const handleCreateProcess = () => router.visit(route('judicial.proceso.create'));
  const handleEdit = (id: string) => router.visit(route('proceso.edit', id));
  const handleUpdate = (id: string) => router.put(route('proceso.update', id));

  const handleLastUpdates = async () => {
    const { data } = await axios.get(route('proceso-last-update.index'));
    setLastDetalle(data);
    setDialogLastUpdate(true);
  };

  const handleShowMovimientos = async (id: string) => {
    const { data } = await axios.get(route('proceso.movimiento', id));
    // setProcesoId(id);
    setMovimiento(data);
    setDialog(true);
  };

  const actionsBodyTemplate = (data: any) => (
    <div className="flex gap-1 justify-center m-1">
      <SecondaryButton icon="fas fa-folder fa-lg" severe="info" onClick={() => handleShowMovimientos(data.id)} />
      {
        (auth.isAdmin) &&
        <SecondaryButton
          icon="fas fa-pencil fa-lg"
          onClick={() => handleEdit(data.id)}
          tooltip="editar"
          tooltipOptions={{ position: 'bottom' }}
        />
      }
      {
        (!auth.isAdmin && auth.user.id == data.user_id) &&
        <Button
          icon={classNames('fas fa-lg', !data.activo ? 'fa-check' : 'fa-times')}
          onClick={() => handleUpdate(data.id)}
          tooltip={!data.activo ? 'Activar' : 'Inactivar'}
          tooltipOptions={{ position: 'bottom' }}
        />
      }
    </div>
  );

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Procesos Judiciales" breadCrumb={breadCrumb} errors={errors}>
      {/* <DialogMovimiento proceso={procesoId} model={movimiento} visible={dialog} onHide={() => setDialog(false)} />
      <DialogLastUpdate isAdmin={auth.isAdmin} model={lastDetalle} visible={dialogLastUpdate} onHide={() => setDialogLastUpdate(false)} /> */}

      {/* <DataTableProceso
        auth={auth}
        value={procesos.data}
        isCrud
        isLastUpdates
        onLastUpdates={handleLastUpdates}
        onMovimiento={handleShowMovimientos}
        urlDownload={route('proceso.export')}

        filters={{ search, statu }}
        rows={100}
        first={procesos.from}
        totalRecords={procesos.total}
        onPage={handlePage}
      /> */}

      <div className="flex justify-between mb-2">
        <div className="flex gap-2">
          {
            // isLastUpdates &&
            <SecondaryButton
              icon="fas fa-newspaper"
              label="Ultimas Actualizaciones"
            // onClick={handleLastUpdates}
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
            options={optionsStatus}
            showClear
            value={filters.statu}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2">
          <SecondaryButton icon="fas fa-refresh" onClick={handleRefresh} />
          <PrimaryButton icon="fas fa-plus" label="Agregar nuevo cliente" onClick={handleCreateClient} />
          <PrimaryButton icon="fas fa-plus" label="Agregar proceso" onClick={handleCreateProcess} />
          {
            auth.isAdmin &&
            <form action={route('proceso.export')} method="get">
              {
                Object.keys(filters).map(key => (
                  // @ts-ignore
                  <input key={key} type="hidden" name={key} value={filters[key]} />
                ))
              }
              <PrimaryButton icon="fas fa-download" label="Descargar" type="submit" />
            </form>
          }
        </div>
      </div>
      <DataTable
        value={procesos.data}
        hiddenButtons
        scrollable
        scrollHeight="calc(100vh - 20rem)"
        emptyMessage="No existen resultados"

        lazy
        paginator
        rows={100}
        first={procesos.from}
        totalRecords={procesos.total}
        onPage={e => handlePage((e.page || 0) + 1)}
      >
        <Column field="process" header="Numero del Proceso" headerClassName={classNames(classHeader, 'w-72')} bodyClassName={classBody} />
        <Column field="client" header="Cliente" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        <Column field="actor" header="Actor" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        <Column field="defendant" header="Demandado" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        <Column field="typeProcedure" header="Tipo de Procedimiento" headerClassName={classNames(classHeader, 'w-72')} bodyClassName={classBody} />
        <Column field="proceduralStage" header="Etapa procesal" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        {
          auth.isAdmin &&
          <Column field="userName" header="Usuario" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
        }
        <Column field="status" header="Estatus" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        <Column body={actionsBodyTemplate} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
      </DataTable>
    </AuthenticatedLayout>
  );
}
