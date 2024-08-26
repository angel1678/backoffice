import React, { FormEvent } from 'react';
import { Errors } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { Dropdown } from 'primereact/dropdown';

import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { DropdownType } from '@/types';
import Icon from '@/Components/Icon';

type Props = {
  className?: string;
  clients?: DropdownType[];
  defaultUserId?: number;
  users?: DropdownType[];
  onErrors: (errors: Errors) => void;
}

type State = {
  fileProcesos: File | null;
  clientId?: number;
  userId?: number;
}

const CreateMultipleForm = ({ className, clients, defaultUserId, users, onErrors }: Props) => {
  const { data, setData, errors, post, progress, processing } = useForm<State>({
    fileProcesos: null, userId: defaultUserId
  });

  const handleSubmit = () => {
    post(route('judicial.process.batchStore'), {
      preserveState: true,
      onError: (errors) => onErrors && onErrors(errors)
    })
  };

  return (
    <section className={className}>
      <header className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-900">Registro de carga masiva</h2>
        <div className="flex gap-2">
          <PrimaryButton label="Registrar" icon={<Icon name="registrar" className="h-6 mr-1" />} onClick={handleSubmit} disabled={processing} />
        </div>
      </header>

      <form className="flex flex-col items-center mt-6 space-y-6">

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

        <div className="w-1/4">
          <InputLabel htmlFor="userId" value="Ejecutivo" />

          <Dropdown
            id="userId"
            className="mt-1 w-full"
            options={users}
            required
            value={data.userId}
            onChange={(e) => setData('userId', e.value)}
          />

          <InputError message={errors.userId} className="mt-2" />
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
      </form>
    </section>
  )
}

export default CreateMultipleForm;
