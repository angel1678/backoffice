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

  const classHeader = 'text-center';
  const classBody = '!text-center';

  const handleDetalle = async (movimiento: any) => {
    router.visit(route('proceso.movimiento.show', movimiento));
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
        onClick={() => handleDetalle(data.id)}
      />
    </div>
  );

  return (
    <>
      <DialogMovimientoDetalle model={detalle} visible={dialog} onHide={() => setDialog(false)} />

      <Dialog header="Procesos Judiciales \ Movimientos" visible={visible} className="w-[80rem]" onHide={onHide}>
        <DataTable value={model} size="small">
          <Column field="fecha" header="Fecha" headerClassName={classHeader} bodyClassName={classBody} />
          <Column field="numero_ingreso" header="Numero Ingreso" headerClassName={classNames(classHeader, 'w-14')} bodyClassName={classBody} />
          <Column field="dependencia_jurisdiccional" header="Dependencia jurisdiccional" headerClassName={classNames(classHeader, 'w-64')} bodyClassName={classBody} />
          <Column field="actor_ofendido" header="Actor / Ofendido" headerClassName={classNames(classHeader, 'w-32')} bodyClassName={classBody} />
          <Column field="accion_infraccion" header="Accion / Infraccion" headerClassName={classNames(classHeader, 'w-40')} bodyClassName={classBody} />
          <Column field="demandado_procesado" body={bodyDemandadoProcesado} header="Demandado / Procesado" headerClassName={classHeader} bodyClassName={classBody} />
          <Column body={bodyAcciones} header="Acciones" headerClassName={classNames(classHeader, 'w-22')} />
        </DataTable>
      </Dialog>
    </>
  )
}

export default DialogMovimiento
