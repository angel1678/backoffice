import React from 'react';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function UpdateInformationForm({ model = {}, className }) {

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm(
    Object.entries(model).reduce((prev, [key, data]) => ({ ...prev, [key]: data.valor }), {})
  );

  const submit = (e) => {
    e.preventDefault();
    patch(route('setting.update'));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Procesos</h2>

        <p className="mt-1 text-sm text-gray-600">
          Parametros a configurar para los Procesos Judiciales.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        {
          Object.entries(model).map(([key, value]) => (
            <div key={key}>
              <InputLabel htmlFor={key} value={value?.nombre} />

              <span className="text-xs text-slate-700">{value?.descripcion}</span>

              <InputNumber
                id={key}
                className="mt-2 block"
                inputClassName="w-full rounded-md border-slate-300"
                value={data[key]}
                onChange={(e) => setData(key, e.value)}
                required
              />

              <InputError className="mt-2" message={errors[key]} />
            </div>
          ))
        }

        <div className="flex items-center gap-4">
          <Button icon="fas fa-save fa-lg" label="Actualizar" disabled={processing} className="text-xs font-semibold tracking-widest uppercase" />

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-gray-600">Actualizado.</p>
          </Transition>
        </div>
      </form>
    </section>
  )
}
