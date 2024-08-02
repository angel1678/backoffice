import React, { useState } from 'react';

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

import useNotification from '@/Hook/useNotification';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import IconButton from '@/Components/IconButton';
import useDialog from '@/Hook/useDialog';
import UploadDocument from '@/Components/UploadDocument';
import { router } from '@inertiajs/react';
import ShowDocument from '@/Components/ShowDocument';

type Props = PageProps & {
  movimiento: any;
  detalle: any[];
  users: any[];
  associates: any[];
  ownerId: any;
};

export default function Show({ movimiento, users, associates, app, auth, ownerId, errors, ...props }: Props) {
  const commentId = useNotification(state => state.commentId);
  const { visible: visibleUploadFile, handleShow: handleShowUploadFile, handleHide: handleHideUploadFile } = useDialog();
  const { visible: visibleFile, handleShow: handleShowFile, handleHide: handleHideFile } = useDialog();

  const [visible, setVisible] = useState(false);
  const [detalle, setDetalle] = useState(props.detalle);
  const [detailSelected, setDetailSelected] = useState<any>();
  const [files, setFiles] = useState([]);

  const handleUploadFile = (files: any) => {
    router.post(route('judicial.detail.upload', detailSelected.id), { files }, {
      preserveState: true,
      onSuccess: () => {
        handleHideUploadFile();
      },
    });
  };

  const handleAddFile = (item: any) =>
    () => {
      handleShowUploadFile();
      setDetailSelected(item);
    };

  const handleSearchFile = (item: any) =>
    () => {
      router.get(route('judicial.detail.document', item.id), {}, {
        preserveState: true,
        onSuccess: ({ props }) => {
          const { documents } = props as any;
          setFiles(documents);
          handleShowFile();
        },
      });
    };

  return (
    <>
      <UploadDocument
        header="Subir documentos"
        visible={visibleUploadFile}
        onAccept={handleUploadFile}
        onHide={handleHideUploadFile}
      />

      <ShowDocument
        documents={files}
        header="Mostrar documentos"
        visible={visibleFile}
        onHide={handleHideFile}
      />

      <AuthenticatedLayout app={app} auth={auth} errors={errors} title="Procesos Judiciales" urlBack={route('judicial.process.index')}>
        {/* <DialogAddUser
        ownerId={ownerId}
        procesoId={movimiento.proceso_id}
        users={users}
        associates={associates}
        visible={visible}
        onHide={() => setVisible(false)}
      /> */}

        <div className="flex gap-4">
          <div className="bg-white rounded-lg shadow-lg w-[30%] px-4 py-2">
            <div className="font-bold text-lg border-b-2 px-3 py-2">
              Información
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
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="rounded-lg shadow-lg w-full px-4 py-2 bg-[#DBECFE] border-[#1F57D6] border">
              <div className="font-bold text-lg px-3 py-2">
                Detalle
              </div>
              <div>
                <div className="w-full overflow-scroll pr-1" style={{ height: 'calc(100vh - 15rem)' }} >
                  <div className="flex flex-col gap-4">
                    {
                      detalle.map((item, index) => (
                        <div key={index} className="px-3 pt-3 pb-2 bg-white rounded-lg shadow-md">
                          <div className="flex flex-row gap-2">
                            <div className="w-full">
                              <div className="font-semibold text-sm mb-1">
                                {item.fecha} - {item.titulo}
                              </div>
                              <div className="text-sm ml-1.5">{item.comentario}</div>
                            </div>
                            <div className="flex flex-col gap-2 justify-start">
                              <IconButton icon="pi pi-plus" onClick={handleAddFile(item)} />
                              <IconButton icon="pi pi-search" onClick={handleSearchFile(item)} />
                            </div>
                          </div>
                          {/* <Comments procesoId={movimiento.proceso_id} detalleId={item.id} comentarios={item.comentarios} /> */}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <PrimaryButton label="Observaciones generales" />
              <PrimaryButton label="Elaborar escrito" />
              <PrimaryButton label="Enviar a pasivo" />
              <PrimaryButton label="Restablecer a activo" />
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  )
}
