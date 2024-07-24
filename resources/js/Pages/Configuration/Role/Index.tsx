import React, { useState } from 'react';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import DataTable from '@/Components/DataTable';
import useDialog from '@/Hook/useDialog';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import Form from './Partials/Form';
import { router } from '@inertiajs/react';

type Props = PageProps & {
  models: any[];
  formOptions: { users: any[], roles: string[] };
};

export default function Index({ app, auth, errors, models }: Props) {
  const { visible, handleShow, handleHide } = useDialog();
  const [edit, setEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [formOptions, setFormOptions] = useState<{ users: any[], roles: string[] }>();

  const handleAdd = () => {
    router.get(route('configuration.role.create'), {}, {
      preserveState: true,
      onSuccess: ({ props }) => {
        const { formOptions } = props as any;
        setEdit(false);
        setFormOptions(formOptions);
        setSelected(undefined);
        handleShow();
      },
    })
  };

  const handleEdit = (data: any) => {
    router.get(route('configuration.role.edit', data?.id), {}, {
      preserveState: true,
      onSuccess: ({ props }) => {
        const { formOptions } = props as any;
        setEdit(true);
        setFormOptions(formOptions);
        setSelected(data);
        handleShow();
      },
    })
  };

  const handleDelete = (data: any) => {
    confirmDialog({
      header: 'Eliminar usuario',
      message: `Esta seguro de eliminar al usuario ${data.name}`,
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        router.delete(route('configuration.role.destroy', data?.id), {
          preserveState: true
        })
      },
    });
  };

  const rolesTemplate = (data: any, options: ColumnBodyOptions) => (
    <span>{data[options.field].map((e: any) => e.title).join(', ')}</span>
  );

  return (
    <>
      <Form
        edit={edit}
        formOptions={formOptions}
        header={"Asignar Rol"}
        model={selected}
        visible={visible}
        onHide={handleHide}
      />
      <Authenticated app={app} auth={auth} errors={errors} title="Roles">
        <DataTable
          value={models}
          scrollHeight="calc(100vh - 13rem)"
          title="Roles del sistema"

          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        >
          <Column field="name" header="Nombre" style={{ width: '30%' }} />
          <Column field="email" header="Correo" style={{ width: '40%' }} />
          <Column field="roles" header="Roles" body={rolesTemplate} style={{ width: '30%' }} />
        </DataTable>
      </Authenticated>
    </>
  )
}
