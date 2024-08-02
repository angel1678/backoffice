import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import ReactHtmlParser from '@orrisroot/react-html-parser';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

import DialogMovimientoDetalle from './DialogMovimientoDetalle';
import SecondaryButton from './SecondaryButton';

type Props = {
  proceso: any;
  model: any[];
  visible: boolean;
  onHide: () => void;
};

const DialogMovimiento = ({ proceso, model = [], visible, onHide }: Props) => {
  const [dialog, setDialog] = useState(false);
  const [detalle, setDetalle] = useState([]);

  const classHeader = '!text-center text-lg';
  const classBody = '!text-center';

  const handleDetalle = async (data: any) => {
    router.visit(route('judicial.movimient.show', [data.proceso_id, data.id]));
  };

  const bodyDemandadoProcesado = (data: any) => (
    <>
      {ReactHtmlParser(data.demandado_procesado)}
    </>
  );

  const bodyAcciones = (data: any) => (
    <div className="flex gap-1 justify-center">
      <SecondaryButton
        severe="info"
        icon="fas fa-folder fa-lg"
        onClick={() => handleDetalle(data)}
      />
    </div>
  );

  return (
    <>
      <DialogMovimientoDetalle model={detalle} visible={dialog} onHide={() => setDialog(false)} />

      <Dialog header="Procesos Judiciales \ Movimientos" visible={visible} className="w-[80%]" onHide={onHide}>
        <DataTable value={model} size="small">
          <Column field="fecha" header="Fecha" headerClassName={classNames(classHeader, 'w-[11%]')} />
          <Column field="numero_ingreso" header="Numero Ingreso" headerClassName={classNames(classHeader, 'w-[9%]')} bodyClassName={classBody} />
          <Column field="dependencia_jurisdiccional" header="Dependencia jurisdiccional" headerClassName={classNames(classHeader, 'w-[26%]')} bodyClassName={classBody} />
          <Column field="actor_ofendido" header="Actor / Ofendido" headerClassName={classNames(classHeader, 'w-[10%]')} bodyClassName={classBody} />
          <Column field="accion_infraccion" header="Accion / Infraccion" headerClassName={classNames(classHeader, 'w-[12%]')} bodyClassName={classBody} />
          <Column field="demandado_procesado" body={bodyDemandadoProcesado} header="Demandado / Procesado" headerClassName={classNames(classHeader, 'w-[26%]')} bodyClassName={classBody} />
          <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-[3rem]')} />
        </DataTable>
      </Dialog>
    </>
  )
}

export default DialogMovimiento
