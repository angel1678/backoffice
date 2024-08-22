import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';
import useDialog from '@/Hook/useDialog';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import Form from './Partials/Form';

type Props = PageProps & {
  models: any[];
  formOptions: { users: any[], roles: string[] };
};

export default function Index({ app, auth, errors, models }: Props) {
  const classHeader = 'text-lg';

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

  const rolesTemplate = (data: any, options: ColumnBodyOptions) => (
    <span>{data[options.field].map((e: any) => e.title).join(', ')}</span>
  );

  const buttonsTemplate = (data: any) => (
    <>
      <PrimaryButton icon="pi pi-envelope" severity="info" onClick={() => handleSendRegister(data)} />
    </>
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
          buttons={buttonsTemplate}
          value={models}
          scrollHeight="calc(100vh - 13rem)"
          title="Roles del sistema"

          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        >
          <Column field="name" header="Nombre" headerClassName={classHeader} style={{ width: '15%' }} />
          <Column field="nickname" header="Username" headerClassName={classHeader} style={{ width: '15%' }} />
          <Column field="email" header="Correo" headerClassName={classHeader} style={{ width: '25%' }} />
          <Column field="email_verified_at" headerClassName={classHeader} header="Fecha de verificación" style={{ width: '15%' }} />
          <Column field="roles" header="Roles" headerClassName={classHeader} body={rolesTemplate} style={{ width: '30%' }} />
        </DataTable>
      </Authenticated>
    </>
  )
}
