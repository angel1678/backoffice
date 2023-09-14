import { Badge } from 'primereact/badge';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';
import { Button } from 'primereact/button';
import { router } from '@inertiajs/react';

export default function Dashboard({ auth, movimientos = [], errors }) {
  const classHeader = 'text-center';
  const classBody = '!text-center text-sm text-black';

  const headerMovimientos = (
    <div className="flex items-center gap-3 text-blue-800 font-bold text-base">
      <Badge value={movimientos.length} /> <span>Nuevos Movimientos</span>
    </div>
  );

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
    <AuthenticatedLayout
      auth={auth}
      title="Dashboard"
      errors={errors}
    >
      <div className="flex">

        <div className="w-1/2">
          <DataTable value={movimientos} header={headerMovimientos} size="small">
            {
              auth.isAdmin &&
              <Column field="user_name" header="Usuario" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
            }
            <Column field="codigo_proceso" header="Proceso" headerClassName={classHeader} bodyClassName={classBody} />
            <Column field="fecha" header="Fecha" headerClassName={classHeader} bodyClassName={classBody} />
            <Column body={bodyTituloAccionInfraccion} header="Titulo / Acción - Infracción" headerClassName={classHeader} bodyClassName={classBody} />
            <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
          </DataTable>
        </div>

      </div>
    </AuthenticatedLayout>
  );
}
