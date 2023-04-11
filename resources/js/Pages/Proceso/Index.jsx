import { useState } from 'react';
import axios from 'axios';
import { Head, router } from '@inertiajs/react';
import { Button } from 'primereact/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProcesoItem from './Partials/ProcesoItem';
import DialogMovimiento from './Partials/DialogMovimiento';

export default function Dashboard(props) {
  const [dialog, setDialog] = useState(false);
  const [procesoId, setProcesoId] = useState([]);
  const [movimiento, setMovimiento] = useState([]);

  const handleRefresh = () => router.reload();
  const handleCreate = () => router.visit(route('proceso.create'));
  const handleShowMovimientos = async (id) => {
    const { data } = await axios.get(route('proceso.movimiento', id));
    setProcesoId(id);
    setMovimiento(data);
    setDialog(true);
  };

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Procesos Judiciales</h2>}
    >
      <Head title="Procesos Judiciales" />

      <DialogMovimiento proceso={procesoId} model={movimiento} visible={dialog} onHide={() => setDialog(false)} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex gap-2 justify-end mb-2">
                <Button icon="fas fa-refresh fa-lg" className="p-button-help text-xs font-semibold tracking-widest uppercase" onClick={handleRefresh} />
                <Button icon="fas fa-plus fa-lg" className="text-xs font-semibold tracking-widest uppercase" label="Agregar" onClick={handleCreate} />
              </div>
              <table className="table-auto w-full border-collapse border border-slate-400">
                <thead>
                  <tr>
                    {
                      props.auth.isAdmin &&
                      <th className="border border-slate-300 p-2">Usuario</th>
                    }
                    <th className="border border-slate-300 p-2">Codigo de judicatura</th>
                    <th className="border border-slate-300 p-2 w-24">Año</th>
                    <th className="border border-slate-300 p-2">No. Secuencial</th>
                    <th className="border border-slate-300 p-2">Fecha actualización</th>
                    <th className="border border-slate-300 p-2">Estado actual</th>
                    <th className="border border-slate-300 p-2 w-14">Activo</th>
                    <th className="border border-slate-300 p-2 w-24">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    props.procesos.map(proceso => <ProcesoItem key={proceso.id} auth={props.auth} proceso={proceso} onMovimiento={handleShowMovimientos} />)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
