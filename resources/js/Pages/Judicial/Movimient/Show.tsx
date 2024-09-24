import React, { useEffect, useLayoutEffect, useState } from 'react';
import { router } from '@inertiajs/react';

import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import IconButton from '@/Components/IconButton';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ShowDocument from '@/Components/ShowDocument';
import UploadDocument from '@/Components/UploadDocument';
import useDialog from '@/Hook/useDialog';
import useNotification from '@/Hook/useNotification';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import AddUser from './Partial/AddUser';
import Comments from './Partial/Comments';
import GeneralComments from './Partial/GeneralComments';
import Icon from '@/Components/Icon';

type Props = PageProps & {
  associates: any[];
  client: any;
  detalle: any[];
  movimiento: any;
  process: any;
  ownerId: any;
  users: any[];
  comments: any[];
  proceduresType: any[];
};

export default function Show({ client, comments, movimiento, proceduresType, process, users, associates, app, auth, ownerId, errors, ...props }: Props) {
  const commentId = useNotification(state => state.commentId);
  const uploadFile = useDialog();
  const showFile = useDialog();
  const addUser = useDialog();
  const generalComments = useDialog();

  const [detalle, setDetalle] = useState(props.detalle);
  const [detailSelected, setDetailSelected] = useState<any>();
  const [files, setFiles] = useState([]);

  console.log({ proceduresType, process });

  const [procedureType, setProcedureType] = useState<any>(process.procedural_stage_id);

  const handleUploadFile = (files: any) => {
    router.post(route('judicial.detail.upload', detailSelected.id), { files }, {
      preserveState: true,
      onSuccess: () => {
        uploadFile.handleHide();
      },
    });
  };

  const handleAddFile = (item: any) =>
    () => {
      uploadFile.handleShow();
      setDetailSelected(item);
    };

  const handleSearchFile = (item: any) =>
    () => {
      router.get(route('judicial.detail.document', item.id), {}, {
        preserveState: true,
        onSuccess: ({ props }) => {
          const { documents } = props as any;
          setFiles(documents);
          showFile.handleShow();
        },
      });
    };

  const handleProceduralStage = (status: string) =>
    () => {
      router.put(route('judicial.process.update', process.id), { status }, {
        preserveState: true,
        preserveScroll: true,
        onError: console.log,
      })
    };

  const handleShowGeneralComments = () => {
    router.get(route('judicial.comment.index', process.id), {}, {
      preserveState: true,
      onSuccess: () => {
        generalComments.handleShow();
      },
    });
  };

  const handleCreateTemplate = () => {
    router.visit(route('judicial.movimient.template', movimiento.id));
  };

  const handleProcedureStage = (e: DropdownChangeEvent) => {
    router.put(route('judicial.process.update', process.id), { proceduralStage: e.value }, {
      preserveState: true,
      onSuccess: ({ props }) => {
        const { process } = props as any;
        setProcedureType(process.procedural_stage_id);
      }
    });
  };

  const headerTemplate = (
    <div className="flex justify-between items-end w-full">
      <div>
        <InputLabel value="Etapa Procesal" />
        <Dropdown
          options={proceduresType}
          className="w-52"
          value={procedureType}
          onChange={handleProcedureStage}
        />
      </div>
      <div className="flex flex-col font-bold text-lg gap-1">
        <span className="self-end">Numero de proceso: {process.process}</span>

        <div className="flex gap-2">
          <PrimaryButton label="Registar gasto" icon={<Icon name="facturacion" className="w-7 h-7 mr-1" />} className="!text-base" />
          <PrimaryButton label="Descargar reporte de la facturacion de gastos" icon={<Icon name="descarga-reporte" className="w-7 h-7 mr-1" />} className="w-60 !text-sm" />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    window.Echo.private(`movimiento_${movimiento.id}`)
      .listen('ProcesoDetalleComentarioEvent', (e: any) => {
        setDetalle(state => state.map(item => {
          if (item.id === e.detalle_id) {
            return { ...item, comments: [...item.comments, e.comentario] }
          }
          return item;
        }));
      })
      .error((status: any) => console.log("ProcesoMovimientoDetalle", status));
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
    <>
      <UploadDocument
        header="Subir documentos"
        visible={uploadFile.visible}
        onAccept={handleUploadFile}
        onHide={uploadFile.handleHide}
      />

      <ShowDocument
        documents={files}
        header="Mostrar documentos"
        visible={showFile.visible}
        onHide={showFile.handleHide}
      />

      <AddUser
        ownerId={ownerId}
        procesoId={movimiento.proceso_id}
        users={users}
        associates={associates}
        visible={addUser.visible}
        onHide={addUser.handleHide}
      />

      <GeneralComments
        header="Observaciones Generales"
        judicialId={process.id}
        models={comments}
        visible={generalComments.visible}
        onHide={generalComments.handleHide}
      />

      <AuthenticatedLayout
        app={app}
        auth={auth}
        errors={errors}
        title="Procesos Judiciales"
        showBack
        classNameBack="w-[31%]"
        header={headerTemplate}
      >
        <div className="flex gap-4">
          <div className='flex flex-col gap-2 w-[30%] overflow-auto pr-1' style={{ height: 'calc(100vh - 13rem)' }}>
            <div className="bg-white rounded-lg shadow-lg px-4 py-2">
              <div className="font-bold text-lg border-b-2 px-3 py-2">
                Información
              </div>
              <div className="grid p-3">
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Fecha</div>
                  <div>{movimiento.fecha}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Numero Ingreso</div>
                  <div>{movimiento.numero_ingreso}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Dependencia / Jurisdiccional</div>
                  <div>{movimiento.dependencia_jurisdiccional}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Actor / Ofendido</div>
                  <div>{movimiento.actor_ofendido}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Accion / Infraccion</div>
                  <div>{movimiento.accion_infraccion}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Demandado / Procesado</div>
                  <div>{movimiento.demandado_procesado}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-sm">Usuarios involucrados</div>
                    {
                      ownerId == auth.user.id &&
                      <Button icon="pi pi-plus" text rounded className="!h-10" onClick={addUser.handleShow} />
                    }
                  </div>
                  <div>
                    {associates.map(i => i.name).join(', ')}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg px-4 py-2">
              <div className="font-bold text-lg border-b-2 px-3 py-2">
                Información del Proceso
              </div>
              <div className="grid p-3">
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Cliente</div>
                  <div>{client.name}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Cuantía</div>
                  <div>{process.amount}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Procedimiento</div>
                  <div>{process.type_procedure}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Usuarios involucrados</div>
                  <div>{process.actor_names}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Operación</div>
                  <div>{process.number_operation}</div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className="font-bold text-sm">Demandado</div>
                  <div>{process.defendant_names}</div>
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
                <div className="w-full overflow-scroll pr-1" style={{ height: 'calc(100vh - 20.5rem)' }} >
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
                          <Comments
                            procesoId={movimiento.proceso_id}
                            detalleId={item.id}
                            comentarios={item.comments}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <PrimaryButton label="Observaciones generales" onClick={handleShowGeneralComments} />
              <PrimaryButton label="Elaborar escrito" onClick={handleCreateTemplate} />
              <PrimaryButton label="Enviar a pasivo" onClick={handleProceduralStage('pasivo')} disabled={process.status == 71} />
              <PrimaryButton label="Restablecer a activo" onClick={handleProceduralStage('activo')} disabled={process.status == 70} />
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  )
}
