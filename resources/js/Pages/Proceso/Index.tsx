import React, { useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';

import DialogMovimiento from '@/Components/DialogMovimiento';
import DataTableProceso from '@/Components/DataTableProceso';
import DialogLastUpdate from '@/Components/DialogLastUpdate';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

type Props = PageProps & {
  procesos: any;
};

export default function Proceso({ app, auth, errors, procesos, search, statu }: Props) {
  const breadCrumb = [
    { label: 'Judicial', icon: 'judicial' },
    { label: 'Todos los procesos' }
  ];

  const [dialog, setDialog] = useState(false);
  const [procesoId, setProcesoId] = useState([]);
  const [movimiento, setMovimiento] = useState([]);

  const [dialogLastUpdate, setDialogLastUpdate] = useState(false);
  const [lastDetalle, setLastDetalle] = useState([]);

  const handleLastUpdates = async () => {
    const { data } = await axios.get(route('proceso-last-update.index'));
    setLastDetalle(data);
    setDialogLastUpdate(true);
  };

  const handleShowMovimientos = async (id) => {
    const { data } = await axios.get(route('proceso.movimiento', id));
    setProcesoId(id);
    setMovimiento(data);
    setDialog(true);
  };

  const handlePage = (page: number, filters: any) => {
    const data: any = Object.fromEntries(Object.entries({ page, ...filters })
      .filter(([_, v]) => (v != null && v != '')));
    router.get(route('proceso.index'), data, { preserveState: true });
  };

  return (
    <AuthenticatedLayout
      app={app}
      auth={auth}
      title="Procesos Judiciales"
      errors={errors}
      breadCrumb={breadCrumb}
    >
      <DialogMovimiento proceso={procesoId} model={movimiento} visible={dialog} onHide={() => setDialog(false)} />
      <DialogLastUpdate isAdmin={auth.isAdmin} model={lastDetalle} visible={dialogLastUpdate} onHide={() => setDialogLastUpdate(false)} />

      <DataTableProceso
        auth={auth}
        value={procesos.data}
        isCrud
        isLastUpdates
        onLastUpdates={handleLastUpdates}
        onMovimiento={handleShowMovimientos}
        urlDownload={route('proceso.export')}

        filters={{ search, statu }}
        rows={100}
        first={procesos.from}
        totalRecords={procesos.total}
        onPage={handlePage}
      />
    </AuthenticatedLayout>
  );
}
