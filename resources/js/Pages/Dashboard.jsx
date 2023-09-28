import { router } from '@inertiajs/react';
import * as dayjs from 'dayjs';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';

import Icon from '@/Components/Icon';
import dateFormatLong from '@/Helper/dateFormatLong';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const breadCrumb = [
  { label: 'Inicio', icon: 'home' }
];

export default function Dashboard({ auth, movimientos = [], errors }) {
  const dateNow = dayjs();
  const classHeader = 'text-center';
  const classBody = '!text-center text-sm text-black';

  const handleDetalle = async (movimiento) => {
    router.visit(route('proceso.movimiento.show', movimiento));
  };

  const bodyTituloAccionInfraccion = (data) => (
    <div>
      <div>{data.titulo}</div>
      <div>{data.accion_infraccion}</div>
    </div>
  );

  const bodyAcciones = (data) => (
    <div className="flex gap-1 justify-center m-1">
      <Button icon="fas fa-folder fa-md" className="p-button-info h-8" onClick={() => handleDetalle(data.movimiento_id)} />
    </div>
  );

  return (
    <AuthenticatedLayout auth={auth} title="Dashboard" breadCrumb={breadCrumb} errors={errors}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center bg-blue-700 h-36 p-8 w-full rounded-xl text-white">
          <span className="text-xl font-thin mb-2">{dateFormatLong(dateNow)}</span>
          <span className="text-3xl font-semibold">¡Bienvenido {auth.user.name}!</span>
        </div>
        <div className="bg-white shadow-lg h-full w-1/2 p-4 rounded-xl" style={{ height: 'calc(100vh - 18.5rem)' }}>
          <section className="border-b-2 mb-2">
            <div className="flex gap-3 items-end mb-2">
              <Icon name="judicial" className="h-8" isDark />
              <span className="text-2xl font-bold">Judicial</span>
            </div>
            <div>
              <span className="text-xl font-semibold">Últimos movimientos</span>
            </div>
          </section>
          <section>
            <DataTable value={movimientos} size="small">
              {
                auth.isAdmin &&
                <Column field="user_name" header="Usuario" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
              }
              <Column field="codigo_proceso" header="Proceso" headerClassName={classHeader} bodyClassName={classBody} />
              <Column field="fecha" header="Fecha" headerClassName={classHeader} bodyClassName={classBody} />
              <Column body={bodyTituloAccionInfraccion} header="Titulo / Acción - Infracción" headerClassName={classHeader} bodyClassName={classBody} />
              <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
            </DataTable>
          </section>
        </div>

      </div>
    </AuthenticatedLayout>
  );
}
