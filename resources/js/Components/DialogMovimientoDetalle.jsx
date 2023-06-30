import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

const DialogMovimientoDetalle = ({ model = [], visible, onHide }) => {
  const classHeader = 'text-center';
  const classBody = '!text-center align-top';

  return (
    <Dialog header="Procesos Judiciales \ Movimientos \ Detalle" visible={visible} className="w-[80rem]" onHide={onHide}>
      <DataTable value={model} size="small" scrollable scrollHeight="calc(100vh - 210px)">
        <Column field="fecha" header="Fecha" headerClassName={classNames(classHeader, 'w-44')} bodyClassName={classBody} />
        <Column field="titulo" header="Titulo" headerClassName={classNames(classHeader, 'w-56')} bodyClassName={classBody} />
        <Column field="comentario" header="Comentario" headerClassName={classHeader} bodyClassName="!text-justify" />
      </DataTable>
    </Dialog>
  )
}

export default DialogMovimientoDetalle
