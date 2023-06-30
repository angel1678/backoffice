import { useState } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import DialogMovimiento from '@/Components/DialogMovimiento';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTableProceso from '@/Components/DataTableProceso';

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
      errors={errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Procesos Judiciales Detenidos</h2>}
    >
      <Head title="Procesos Judiciales Detenidos" />

      <DialogMovimiento proceso={procesoId} model={movimiento} visible={dialog} onHide={() => setDialog(false)} />

      <div className="py-6">
        <div className="max-w-[96rem] mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <DataTableProceso
                auth={auth}
                modal={procesos}
                onMovimiento={handleShowMovimientos}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
