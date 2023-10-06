import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CreateSingleForm({ className, onErrors }) {
  const { data, setData, errors, post, progress } = useForm({ name: '', description: '', image: undefined });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('coercive.clients.store'), {
      forceFormData: true,
      preserveScroll: true,
      preserveState: true,
      onError: (errors) => onErrors && onErrors(errors)
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Cliente de Coactiva</h2>

        <p className="mt-1 text-sm text-gray-600">
          Agregar nuevo cliente de coactiva.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Nombre del Cliente" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="description" value="Descripción" />

          <InputTextarea
            id="description"
            className="mt-1 block w-full"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            rows={3}
          />

          <InputError message={errors.description} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="image" value="Imagen" />

          <TextInput
            id="image"
            className="mt-1 block w-full"
            onChange={(e) => setData('image', e.target.files[0])}
            type="file"
            required
          />

          {progress && (
            <progress value={progress.percentage} max="100">
              {progress.percentage}%
            </progress>
          )}

          <InputError message={errors.image} className="mt-2" />
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
