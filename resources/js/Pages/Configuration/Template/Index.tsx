import React from 'react';
import { router } from '@inertiajs/react';
import { Column } from 'primereact/column';

import DataTable from '@/Components/DataTable';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, } from '@/types';
import useDialog from '@/Hook/useDialog';

type Props = PageProps & {
  model: any;
}

export default function Index({ app, auth, errors, model }: Props) {
  const handlePage = (page: number, filters?: any) => {
    const data: any = Object.fromEntries(Object.entries({ page, ...filters })
      .filter(([_, v]) => (v != null && v != '')));
    router.get(route('judicial.process.index'), data, { preserveState: true });
  };

  const handleAdd = () => {
    router.visit(route('configuration.template.create'));
  };

  const handleEdit = (data: any) => {
    router.visit(route('configuration.template.edit', data.id));
  };

  const handleDelete = () => { };

  return (
    <Authenticated app={app} auth={auth} title="Plantillas" titleBack="Administración de plantillas" showBack errors={errors}>
      <DataTable
        value={model.data}
        scrollHeight="calc(100vh - 13rem)"
        emptyMessage="No existen resultados"

        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}

        lazy
        paginator
        rows={100}
        first={model.from}
        totalRecords={model.total}
        onPage={e => handlePage((e.page || 0) + 1)}
      >
        <Column field="name" header="Nombre" />
        <Column field="description" header="Descripcion" />
        <Column field="active" header="Activo" />
      </DataTable>
    </Authenticated>
  )
}
