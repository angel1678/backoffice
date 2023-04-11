import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const CreateSingleForm = ({ className, onErrors }) => {
  const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
    judicaturaId: '',
    anioId: '',
    numeroId: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('proceso.store'), {
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
          Agregar nuevo proceso de la judicatura.
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
            isFocused
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
          />

          <InputError message={errors.numeroId} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <Button icon="fas fa-save fa-lg" label="Guardar" className="text-xs font-semibold tracking-widest uppercase" />
        </div>
      </form>
    </section>
  )
}

export default CreateSingleForm;
