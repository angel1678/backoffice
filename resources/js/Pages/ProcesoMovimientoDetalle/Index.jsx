import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';

import DialogAddUser from './Partials/DialogAddUser';
import Comments from './Partials/Comments';

export default function ProcesoMovimientoDetalle({ movimiento, detalle, users, associates, auth, ownerId, errors }) {
  const [visible, setVisible] = useState(false);

  const header = (
    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
      <Link href={route('proceso.index')} className="underline decoration-solid">Procesos Judiciales</Link> \ Detalle Movimiento
    </h2>
  );

  return (
    <AuthenticatedLayout
      auth={auth}
      errors={errors}
      header={header}
    >
      <Head title="Procesos Judiciales" />

      <DialogAddUser
        ownerId={ownerId}
        procesoId={movimiento.proceso_id}
        users={users}
        associates={associates}
        visible={visible}
        onHide={() => setVisible(false)}
      />

      <div className="flex m-2">
        <div className="bg-white rounded-md mr-1 w-[30%]">
          <div className="font-bold text-lg border-b px-3 py-2">
            Movimiento - Información
          </div>
          <ScrollPanel style={{ width: '100%', height: 'calc(100vh - 6.8rem)' }} >
            <div className="grid p-3">
              <div className="flex flex-col mb-2">
                <div className="font-semibold text-sm">Fecha</div>
                <div>{movimiento.fecha}</div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="font-semibold text-sm">Numero Ingreso</div>
                <div>{movimiento.numero_ingreso}</div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="font-semibold text-sm">Dependencia / Jurisdiccional</div>
                <div>{movimiento.dependencia_jurisdiccional}</div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="font-semibold text-sm">Actor / Ofendido</div>
                <div>{movimiento.actor_ofendido}</div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="font-semibold text-sm">Accion / Infraccion</div>
                <div>{movimiento.accion_infraccion}</div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="font-semibold text-sm">Demandado / Procesado</div>
                <div>{movimiento.demandado_procesado}</div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-sm">Usuarios involucrados</div>
                  {
                    ownerId == auth.user.id &&
                    <Button icon="pi pi-plus" text rounded className="!h-10" onClick={() => setVisible(true)} />
                  }
                </div>
                <div>
                  {associates.map(i => i.name).join(', ')}
                </div>
              </div>
            </div>
          </ScrollPanel>
        </div>

        <div className="bg-white rounded-md w-full">
          <div className="font-bold text-lg border-b px-3 py-2">
            Movimiento - Detalle
          </div>
          <div>
            <ScrollPanel style={{ width: '100%', height: 'calc(100vh - 6.8rem)' }} >
              {
                detalle.map((item, index) => (
                  <div key={index} className="px-3 pt-3 pb-2 border-t">
                    <div className="font-semibold text-sm mb-1">
                      {item.fecha} - {item.titulo}
                    </div>
                    <div className="text-sm ml-1.5">{item.comentario}</div>
                    <Comments procesoId={movimiento.proceso_id} detalleId={item.id} comentarios={item.comentarios} />
                  </div>
                ))
              }
            </ScrollPanel>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}
