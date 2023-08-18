import { useState } from 'react';
import axios from 'axios';
import { Panel } from 'primereact/panel';
import DialogMovimiento from '@/Components/DialogMovimiento';
import DataTableProceso from '@/Components/DataTableProceso';
import DialogLastUpdate from '@/Components/DialogLastUpdate';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';

export default function Proceso({ procesos, auth, errors }) {
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

  return (
    <AuthenticatedLayout
      auth={auth}
      title="Procesos Judiciales"
      errors={errors}
    >
      <DialogMovimiento proceso={procesoId} model={movimiento} visible={dialog} onHide={() => setDialog(false)} />
      <DialogLastUpdate isAdmin={auth.isAdmin} model={lastDetalle} visible={dialogLastUpdate} onHide={() => setDialogLastUpdate(false)} />

      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-2">
          <Panel header="Filtros" toggleable collapsed className="panel mb-3">

          </Panel>
          <DataTableProceso
            auth={auth}
            modal={procesos}
            isCrud
            isLastUpdates
            onLastUpdates={handleLastUpdates}
            onMovimiento={handleShowMovimientos}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
