import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const CreateMultipleForm = ({ className, onErrors }) => {
  const { data, setData, errors, post, progress } = useForm({
    fileProcesos: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('proceso.batchStore'), {
      preserveState: true,
      onError: (errors) => onErrors && onErrors(errors)
    })
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Proceso Masivo de la Judicatura</h2>

        <p className="mt-1 text-sm text-gray-600">
          Agregar nuevos procesos de la judicatura mediante archivo de excel.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <p className="mt-1 text-sm text-gray-600">
            Dar click al link para descargar la plantilla:
            <a href="/storage/procesos.xlsx">
              <span className="underline decoration-solid text-blue-700">Plantilla procesos</span>
            </a>
          </p>
        </div>

        <div>
          <InputLabel htmlFor="fileProcesos" value="Codigo de la judicatura de la dependencia judicial" />

          <TextInput
            id="fileProcesos"
            className="mt-1 block w-full"
            type="file"
            // value={data.fileProcesos}
            onChange={(e) => setData('fileProcesos', e.target.files[0])}
            required
            isFocused
          />

          {progress && (
            <progress value={progress.percentage} max="100">
              {progress.percentage}%
            </progress>
          )}

          <InputError message={errors.fileProcesos} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <Button icon="fas fa-save fa-lg" label="Guardar" className="text-xs font-semibold tracking-widest uppercase" />
        </div>
      </form>
    </section>
  )
}

export default CreateMultipleForm;
