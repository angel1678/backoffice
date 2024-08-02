import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';

import DataTable from '@/Components/DataTable';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import Create from './Partials/Create';
import useDialog from '@/Hook/useDialog';
import { router } from '@inertiajs/react';

type Props = PageProps & {
  models: any[];
};

export default function Index({ app, auth, errors, models }: Props) {
  const { visible, handleShow, handleHide } = useDialog();
  const classHeader = '!text-center text-lg';

  const handleSendRegister = (data: any) => {
    confirmDialog({
      header: 'Notificar registro',
      message: 'Esta seguro de realizar la notificación, esto reseteara la contraseña del usuario y el email verificado.',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        router.get(route('configuration.user.register', data?.id), {}, {
          preserveState: true,
        });
      }
    })
  };

  const handleAdd = () => handleShow();

  const handleDelete = (data: any) => {
    confirmDialog({
      header: 'Eliminar usuario',
      message: `Esta seguro de eliminar al usuario ${data.name}`,
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        router.delete(route('configuration.user.destroy', data.id), {
          preserveState: true,
        });
      },
    });
  };

  const buttonsTemplate = (data: any) => (
    <>
      <Button icon="pi pi-envelope" severity="info" onClick={() => handleSendRegister(data)} />
    </>
  );

  return (
    <>
      <Create
        header="Agregar Usuario"
        visible={visible}
        onHide={handleHide}
      />
      <Authenticated app={app} auth={auth} errors={errors} title="Usuarios">
        <DataTable
          buttons={buttonsTemplate}
          value={models}
          scrollHeight="calc(100vh - 13rem)"
          title="Usuarios del sistema"

          onAdd={handleAdd}
          onDelete={handleDelete}
        >
          <Column field="name" header="Nombre y Apellido" headerClassName={classHeader} style={{ width: '25%' }} />
          <Column field="nickname" header="Username" headerClassName={classHeader} style={{ width: '20%' }} />
          <Column field="email" header="Correo" headerClassName={classHeader} style={{ width: '37%' }} />
          <Column field="email_verified_at" headerClassName={classHeader} header="Fecha de verificación" style={{ width: '18%' }} />
        </DataTable>
      </Authenticated>
    </>
  )
}
