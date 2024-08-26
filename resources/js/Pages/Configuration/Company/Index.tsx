import React from 'react';
import { router } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import DataTable from '@/Components/DataTable';
import useDialog from '@/Hook/useDialog';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import Create from './Partials/Create';

type Props = PageProps & {
  models: any[];
  formOptions: { users: any[], roles: string[] };
};

export default function Index({ app, auth, errors, models }: Props) {
  const { visible, handleShow, handleHide } = useDialog();

  const handleAdd = () => handleShow();

  const handleEdit = () => { };

  const handleDelete = (data: any) => {
    confirmDialog({
      header: 'Eliminar empresa',
      message: `Esta seguro de eliminar la empresa ${data.name}`,
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        router.delete(route('configuration.company.destroy', data.id), {
          preserveState: true,
        });
      },
    });
  };

  return (
    <>
      <Create
        header="Agregar Empresa"
        visible={visible}
        onHide={handleHide}
      />
      <Authenticated app={app} auth={auth} errors={errors} title="Roles">
        <DataTable
          value={models}
          scrollHeight="calc(100vh - 13rem)"
          title="Empresas que facturan"

          hiddenEdit

          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        >
          <Column field="name" header="Nombre" style={{ width: '50%' }} />
          <Column field="ruc" header="RUC" style={{ width: '45%' }} />
        </DataTable>
      </Authenticated>
    </>
  )
}
