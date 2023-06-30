import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InputText } from 'primereact/inputtext';
import { ScrollPanel } from 'primereact/scrollpanel';

export default function ProcesoMovimientoDetalle({ movimiento, detalle, auth, errors }) {

  return (
    <AuthenticatedLayout
      auth={auth}
      errors={errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Procesos Judiciales - Detalle Movimiento</h2>}
    >
      <Head title="Procesos Judiciales" />
      <div className="flex m-2">
        <div className="bg-white rounded-md mr-1 w-[25rem]">
          <div className="font-bold text-lg border-b px-3 py-2">
            Movimiento - Información
          </div>
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
          </div>
        </div>

        <div className="bg-white rounded-md w-full">
          <div className="font-bold text-lg border-b px-3 py-2">
            Movimiento - Detalle
          </div>
          <div>
            <ScrollPanel style={{ width: '100%', height: 'calc(100vh - 14rem)' }} >
              {
                detalle.map(item => (
                  <div className="px-3 pt-3 pb-2 border-t">
                    <div className="font-semibold text-sm mb-1">
                      {item.fecha} - {item.titulo}
                    </div>
                    <div className="text-sm ml-1.5">{item.comentario}</div>

                    <div className="mt-3">
                      <InputText className="h-7 text-sm w-full" />
                    </div>
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
