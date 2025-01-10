import React from 'react';
import dayjs from 'dayjs';
import { router } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { DataTable, DataTableSelectEvent } from 'primereact/datatable';
import { MenuItem } from 'primereact/menuitem';

import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import dateFormatLong from '@/Helper/dateFormatLong';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import NotificationLink from './Partials/NotificationLink';

const breadCrumb = [
  { label: 'Judicial', icon: 'judicial' }
];

type Props = PageProps & {
  movimientos: any[];
  judicialNotification: any[];
  typeNotification: string;
};

const subMenu: MenuItem[] = [
  { label: 'Inicio', url: 'judicial.dashboard' },
  { label: 'Lista de procesos', url: 'judicial.process.index' },
  { label: 'Reporteria', url: 'process.report.index' },
  { label: 'Gestión de plantillas', url: 'judicial.template.index' },
];

export default function Index({ app, auth, judicialNotification, typeNotification, errors }: Props) {
  const dateNow = dayjs();

  const handleCreateClient = () => router.visit(route('judicial.client.create'));
  const handleCreateProcess = () => router.visit(route('judicial.process.create'));

  const handleDetalle = async (id: string) => {
    router.visit(route('judicial.notification.show', id));
  };

  const handleRowSelect = ({ data }: DataTableSelectEvent) => {
    handleDetalle(data.id);
  };

  // const handleJudiciaryActive = () => router.visit(route('proceso.index'));

  // const bodyTituloAccionInfraccion = (data: any) => (
  //   <div>
  //     <div>{data.titulo}</div>
  //     <div>{data.accion_infraccion}</div>
  //   </div>
  // );

  // const bodyAcciones = (data: any) => (
  //   <div className="flex gap-1 justify-center m-1">
  //     <SecondaryButton
  //       severe="info"
  //       icon="fas fa-folder fa-lg"
  //       onClick={() => handleDetalle(data.movimiento_id)}
  //     />
  //   </div>
  // );

  return (
    <AuthenticatedLayout app={app} auth={auth} subMenu={subMenu} title="Dashboard" breadCrumb={breadCrumb} errors={errors}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center px-8 py-5 w-full rounded-xl text-white bg-gradient-to-r from-[#276CE9] to-[#1F47AE]">
          <span className="text-lg font-thin mb-2">{dateFormatLong(dateNow)}</span>
          <span className="text-2xl font-semibold">¡Bienvenido {auth.user.name}!</span>
        </div>
        <div className="flex justify-end gap-2">
          <SecondaryButton severe="normal" label="Registar cliente nuevo" icon="pi pi-plus" onClick={handleCreateClient} />
          <PrimaryButton label="Registar proceso nuevo" icon="pi pi-plus" onClick={handleCreateProcess} />
        </div>
        <div className="flex w-full" style={{ height: 'calc(100vh - 24rem)' }}>
          <div className="flex flex-col gap-4 items-center pt-12 w-1/4 bg-[#dbecfe] rounded-l-xl">
            <NotificationLink
              icon="notificaciones-nuevas"
              classNameIcon="h-7"
              routeName="judicial.notification.index"
              title="Notificaciones nuevas"
              type="unread"
              value={typeNotification}
            />
            <NotificationLink
              icon="notificaciones-leidsa"
              routeName="judicial.notification.index"
              title="Notificaciones leidas"
              type="read"
              value={typeNotification}
            />
          </div>
          <div className="w-3/4 bg-white rounded-r-xl p-4">
            <DataTable
              value={judicialNotification}
              selectionMode="single"
              onRowSelect={handleRowSelect}
              rowClassName={() => "text-sm"}
            >
              <Column field="data?.user_name" header="Usuario" style={{ width: '25%' }} />
              <Column field="data.proceso" header="Proceso" style={{ width: '25%' }} />
              <Column field="data.fecha" header="Fecha" style={{ width: '25%' }} />
              <Column field="data.titulo" header="Titulo/Accion - Infracción" style={{ width: '25%' }} />
            </DataTable>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
