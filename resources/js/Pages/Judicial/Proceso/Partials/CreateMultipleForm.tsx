import React, { FormEvent } from 'react';
import { Errors } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { Dropdown } from 'primereact/dropdown';

import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { DropdownType } from '@/types';

type Props = {
  className?: string;
  clients?: DropdownType[];
  onErrors: (errors: Errors) => void;
}

type State = {
  fileProcesos: File | null;
  clientId?: number;
}

const CreateMultipleForm = ({ className, clients, onErrors }: Props) => {
  const { data, setData, errors, post, progress } = useForm<State>({
    fileProcesos: null,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('proceso.batchStore'), {
      preserveState: true,
      onError: (errors) => onErrors && onErrors(errors)
    })
  };

  return (
    <section className={className}>
      <header className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-900">Registro de carga masiva</h2>
        <div className="flex gap-2">
          <PrimaryButton label="Registrar" />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 space-y-6">

        <div className="w-1/4">
          <InputLabel htmlFor="clientId" value="Cliente" />

          <Dropdown
            id="clientId"
            className="mt-1 w-full"
            options={clients}
            required
            value={data.clientId}
            onChange={(e) => setData('clientId', e.value)}
          />

          <InputError message={errors.clientId} className="mt-2" />
        </div>

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
            onChange={(e) => setData('fileProcesos', (e.target?.files as FileList)[0])}
            required
          />

          {progress && (
            <progress value={progress.percentage} max="100">
              {progress.percentage}%
            </progress>
          )}

          <InputError message={errors.fileProcesos} className="mt-2" />
        </div>

        {/* <div className="flex items-center gap-4">
          <PrimaryButton icon="fas fa-save fa-lg" label="Guardar" />
        </div> */}
      </form>
    </section>
  )
}

export default CreateMultipleForm;
