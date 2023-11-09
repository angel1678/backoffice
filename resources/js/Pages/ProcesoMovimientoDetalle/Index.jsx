import { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import useNotification from '@/Hook/useNotification';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import DialogAddUser from './Partials/DialogAddUser';
import Comments from './Partials/Comments';

export default function ProcesoMovimientoDetalle({ movimiento, users, associates, auth, ownerId, errors, ...props }) {
  const commentId = useNotification(state => state.commentId);

  const [visible, setVisible] = useState(false);
  const [detalle, setDetalle] = useState(props.detalle);

  useEffect(() => {
    Echo.private(`movimiento_${movimiento.id}`)
      .listen('ProcesoDetalleComentarioEvent', e => {
        setDetalle(state => state.map(item => {
          if (item.id === e.detalle_id) {
            return { ...item, comentarios: [...item.comentarios, e.comentario] }
          }
          return item;
        }));
      })
      .error(status => console.log("ProcesoMovimientoDetalle", status));
  }, []);

  useEffect(() => {
    setDetalle(props.detalle);
  }, [props.detalle]);

  useLayoutEffect(() => {
    const commentDiv = document.querySelector(`#comment_${commentId}`);
    if (commentDiv) {
      commentDiv.scrollIntoView({ behavior: 'smooth' });
      commentDiv.classList.add('bg-orange-200');
      setInterval(() => {
        commentDiv.classList.remove('bg-orange-200');
      }, 1000);
    }
  }, [commentId]);

  return (
    <AuthenticatedLayout
      auth={auth}
      errors={errors}
      title="Procesos Judiciales"
      urlBack={route('proceso.index')}
    >
      <DialogAddUser
        ownerId={ownerId}
        procesoId={movimiento.proceso_id}
        users={users}
        associates={associates}
        visible={visible}
        onHide={() => setVisible(false)}
      />

      <div className="flex gap-4">
        <div className="bg-white rounded-lg shadow-lg w-[30%] px-4 py-2">
          <div className="font-bold text-lg border-b-2 px-3 py-2">
            Información
          </div>
          <ScrollPanel style={{ width: '100%', height: 'calc(100vh - 13.8rem)' }} >
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

        <div className="rounded-lg shadow-lg w-full px-4 py-2 bg-[#DBECFE] border-[#1F57D6] border">
          <div className="font-bold text-lg px-3 py-2">
            Detalle
          </div>
          <div>
            <ScrollPanel style={{ width: '100%', height: 'calc(100vh - 13.8rem)' }} >
              <div className="flex flex-col gap-4">
                {
                  detalle.map((item, index) => (
                    <div key={index} className="px-3 pt-3 pb-2 bg-white rounded-lg shadow-md">
                      <div className="font-semibold text-sm mb-1">
                        {item.fecha} - {item.titulo}
                      </div>
                      <div className="text-sm ml-1.5">{item.comentario}</div>
                      <Comments procesoId={movimiento.proceso_id} detalleId={item.id} comentarios={item.comentarios} />
                    </div>
                  ))
                }
              </div>
            </ScrollPanel>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}
