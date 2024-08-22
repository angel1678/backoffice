import React, { ChangeEvent, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DialogMovimiento from '@/Components/DialogMovimiento';
// import DialogLastUpdate from '@/Components/DialogLastUpdate';
import useAuth from '@/Hook/useAuth';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DropdownType, PageProps } from '@/types';

type Props = PageProps & {
  procesos: any;
  isLastUpdates: boolean;
  statusType: DropdownType[];
};

const breadCrumb = [
  { label: 'Judicial', icon: 'judicial' },
  { label: 'Todos los procesos' }
];

export default function Proceso({ app, auth, errors, procesos, search, status, statusType, isLastUpdates }: Props) {
  const { isAdmin } = useAuth();

  const [hasFilter, setHasFilter] = useState(false);
  const [filters, setFilters] = useState({ status: '', search: '' });

  const classHeader = '!text-center text-lg';
  const classBody = '!text-center';

  const [dialog, setDialog] = useState(false);
  const [procesoId, setProcesoId] = useState([]);
  const [movimiento, setMovimiento] = useState([]);

  // const [dialogLastUpdate, setDialogLastUpdate] = useState(false);
  // const [lastDetalle, setLastDetalle] = useState([]);

  // const handleLastUpdates = async () => {
  //   const { data } = await axios.get(route('proceso-last-update.index'));
  //   setLastDetalle(data);
  //   setDialogLastUpdate(true);
  // };

  const handlePage = (page: number, filters?: any) => {
    const data: any = Object.fromEntries(Object.entries({ page, ...filters })
      .filter(([_, v]) => (v != null && v != '')));
    router.get(route('judicial.process.index'), data, { preserveState: true });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
    setHasFilter(true);
    setFilters(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleRefresh = () => router.reload();
  const handleCreateClient = () => router.visit(route('judicial.client.create'));
  const handleCreateProcess = () => router.visit(route('judicial.process.create'));
  const handleEdit = (id: string) => router.visit(route('proceso.edit', id));
  const handleUpdate = (id: string) => router.put(route('proceso.update', id));

  const handleLastUpdates = async () => {
    // const { data } = await axios.get(route('proceso-last-update.index'));
    // setLastDetalle(data);
    // setDialogLastUpdate(true);
  };

  const handleShowMovimientos = async (id: string) => {
    router.get(route('judicial.movimient.index', id), {}, {
      preserveState: true,
      onSuccess: ({ props }) => {
        const { movimients } = props as any;
        console.log(movimients);
        setMovimiento(movimients);
        setDialog(true);
      },
    });
  };

  const actionsBodyTemplate = (data: any) => (
    <div className="flex gap-1 justify-center m-1">
      <SecondaryButton icon="fas fa-folder fa-lg" severe="info" onClick={() => handleShowMovimientos(data.id)} />
      {isAdmin() && (
        <SecondaryButton
          icon="fas fa-pencil fa-lg"
          onClick={() => handleEdit(data.id)}
          tooltip="editar"
          tooltipOptions={{ position: 'bottom' }}
        />
      )}
      {(!isAdmin() && auth.user.id == data.user_id) && (
        <Button
          icon={classNames('fas fa-lg', !data.activo ? 'fa-check' : 'fa-times')}
          onClick={() => handleUpdate(data.id)}
          tooltip={!data.activo ? 'Activar' : 'Inactivar'}
          tooltipOptions={{ position: 'bottom' }}
        />
      )}
    </div>
  );

  useEffect(() => {
    if (hasFilter) handlePage(1, filters);
  }, [hasFilter, filters]);

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Procesos Judiciales" breadCrumb={breadCrumb} errors={errors}>
      <DialogMovimiento
        proceso={procesoId}
        model={movimiento}
        visible={dialog}
        onHide={() => setDialog(false)}
      />

      {/* <DialogLastUpdate isAdmin={auth.isAdmin} model={lastDetalle} visible={dialogLastUpdate} onHide={() => setDialogLastUpdate(false)} /> */}

      <div className="flex justify-between mb-2">
        <div className="flex gap-2">
          {isLastUpdates &&
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
            name="status"
            placeholder="Selecione un estado"
            options={statusType}
            showClear
            value={filters.status}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2">
          <SecondaryButton icon="fas fa-refresh" onClick={handleRefresh} />
          <PrimaryButton icon="fas fa-plus" label="Agregar nuevo cliente" onClick={handleCreateClient} />
          <PrimaryButton icon="fas fa-plus" label="Agregar proceso" onClick={handleCreateProcess} />
          {
            isAdmin() &&
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
        <Column field="client.name" header="Cliente" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        <Column field="actors" header="Actor" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        <Column field="defendants" header="Demandado" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        <Column field="typeProcedure" header="Tipo de Procedimiento" headerClassName={classNames(classHeader, 'w-72')} bodyClassName={classBody} />
        <Column field="proceduralStage" header="Etapa procesal" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        {
          isAdmin() &&
          <Column field="userName" header="Usuario" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
        }
        <Column field="statusName" header="Estatus" headerClassName={classNames(classHeader, 'w-48')} bodyClassName={classBody} />
        <Column body={actionsBodyTemplate} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
      </DataTable>
    </AuthenticatedLayout>
  );
}
