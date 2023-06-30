import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

const DialogLastUpdate = ({ model = [], visible, onHide, isAdmin }) => {
  const classHeader = 'text-center';
  const classBody = '!text-center align-top';

  return (
    <Dialog header="Procesos Judiciales \ Ultimas actualizaciones" visible={visible} className="w-[80rem]" onHide={onHide}>
      <DataTable value={model} size="small">
        {
          isAdmin &&
          <Column field="user_name" header="Usuario" headerClassName={classNames(classHeader, 'w-36')} bodyClassName={classBody} />
        }
        <Column field="judicatura_id" header="Codigo de judicatura" headerClassName={classHeader} bodyClassName={classBody} />
        <Column field="anio_id" header="Año" headerClassName={classHeader} bodyClassName={classBody} />
        <Column field="numero_id" header="No. Secuencial" headerClassName={classHeader} bodyClassName={classBody} />
        <Column field="fecha" header="Fecha" headerClassName={classNames(classHeader, 'w-44')} bodyClassName={classBody} />
        <Column field="titulo" header="Titulo" headerClassName={classNames(classHeader, 'w-52')} bodyClassName={classBody} />
        <Column field="comentario" header="Comentario" headerClassName={classHeader} bodyClassName="!text-justify" />
      </DataTable>
    </Dialog>
  )
}

export default DialogLastUpdate
