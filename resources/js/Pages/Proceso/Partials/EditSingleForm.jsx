import React from 'react';
import { useForm } from "@inertiajs/react";
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

const EditSingleForm = ({ className, users, model, onErrors }) => {
  const { data, setData, errors, put, processing, recentlySuccessful } = useForm(model);

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('proceso.update', model.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (errors) => onErrors && onErrors(errors)
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Proceso de la Judicatura</h2>

        <p className="mt-1 text-sm text-gray-600">
          Editar proceso de la judicatura.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="judicaturaId" value="Codigo de la judicatura de la dependencia judicial" />

          <TextInput
            id="judicaturaId"
            className="mt-1 block w-full"
            value={data.judicaturaId}
            onChange={(e) => setData('judicaturaId', e.target.value)}
            required
            disabled
          />

          <InputError message={errors.judicaturaId} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="anioId" value="Añio del proceso judicial" />

          <TextInput
            id="anioId"
            className="mt-1 block w-full"
            value={data.anioId}
            onChange={(e) => setData('anioId', e.target.value)}
            required
            disabled
          />

          <InputError message={errors.anioId} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="numeroId" value="Número del proceso judicial" />

          <TextInput
            id="numeroId"
            className="mt-1 block w-full"
            value={data.numeroId}
            onChange={(e) => setData('numeroId', e.target.value)}
            required
            disabled
          />

          <InputError message={errors.numeroId} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="userId" value="Usuario encargado" />

          <Dropdown
            id="userId"
            className="mt-1 w-full h-11"
            options={users}
            value={data.userId}
            onChange={(e) => setData('userId', e.value)}
            required
          />

          <InputError message={errors.userId} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="activo" value="Estado" />

          <div className="flex items-center gap-3">
            <InputSwitch
              id="activo"
              className="mt-1"
              checked={data.activo}
              onChange={(e) => setData('activo', e.value)}
            />

            <span>{data.activo ? 'Activo' : 'Inactivo'}</span>
          </div>

          <InputError message={errors.activo} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton
            icon="fas fa-save fa-lg"
            label="Guardar"
          />
        </div>
      </form>
    </section>
  )

}

export default EditSingleForm;
