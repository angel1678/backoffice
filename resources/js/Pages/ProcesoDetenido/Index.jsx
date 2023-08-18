import { useState } from 'react';
import axios from 'axios';
import DialogMovimiento from '@/Components/DialogMovimiento';
import DataTableProceso from '@/Components/DataTableProceso';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';

export default function ProcesoDetenido({ procesos, auth, errors }) {
  const [dialog, setDialog] = useState(false);
  const [procesoId, setProcesoId] = useState([]);
  const [movimiento, setMovimiento] = useState([]);

  const handleShowMovimientos = async (id) => {
    const { data } = await axios.get(route('proceso.movimiento', id));
    setProcesoId(id);
    setMovimiento(data);
    setDialog(true);
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      title="Procesos Judiciales Detenidos"
      errors={errors}
    >
      <DialogMovimiento proceso={procesoId} model={movimiento} visible={dialog} onHide={() => setDialog(false)} />
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-2">
          <DataTableProceso
            auth={auth}
            modal={procesos}
            onMovimiento={handleShowMovimientos}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
