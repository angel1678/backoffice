import React, { FormEvent } from 'react';
import { Errors } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';

import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';

import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { InputText } from 'primereact/inputtext';

type Props = {
  className?: string;
  clients?: any[];
  onErrors: (errors: Errors) => void;
}

type State = {
  process?: string | undefined;
  clientId?: number;
  actors?: string[];
  defendants?: string[];
  identification?: string;
  numberOperation?: string;
  amount?: number;
  relevantInformation?: number;
  typeProcedure?: number;
  proceduralStage?: number;
  responsible?: number
}

const CreateSingleForm = ({ className, clients, onErrors }: Props) => {
  const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm<State>({
    process: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('proceso.store'), {
      preserveScroll: true,
      preserveState: true,
      onError: (errors) => onErrors && onErrors(errors)
    });
  };

  return (
    <section className={className}>
      <header className="flex justify-between">
        <h2 className="text-2xl font-extrabold text-gray-900">Registro de proceso simple</h2>
        <div className="flex gap-2">
          <PrimaryButton label="Cargar documentos" />
          <PrimaryButton label="Registrar" />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="flex gap-2">
          <div className="w-1/4">
            <InputLabel htmlFor="process" value="Número de proceso" />

            <InputMask
              autoFocus
              className="mt-1 block w-full"
              id="process"
              mask="99999-9999-99999"
              placeholder="99999-9999-99999"
              required
              value={data.process}
              onChange={e => setData('process', e.value?.toString())}
            />

            <InputError message={errors.process} className="mt-2" />
          </div>

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
            <InputLabel htmlFor="actors" value="Actor" />

            <Dropdown
              id="actors"
              className="mt-1 w-full"
              options={[]}
              required
              value={data.actors}
              onChange={(e) => setData('actors', e.value)}
            />

            <InputError message={errors.actors} className="mt-2" />
          </div>

          <div className="w-1/4">
            <InputLabel htmlFor="defendants" value="Demandado" />

            <Dropdown
              id="defendants"
              className="mt-1 w-full"
              options={[]}
              required
              value={data.defendants}
              onChange={(e) => setData('defendants', e.value)}
            />

            <InputError message={errors.defendants} className="mt-2" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/4">
            <InputLabel htmlFor="personWhoPays" value="Persona a quien se le factura" />

            <InputText
              className="mt-1 block w-full"
              id="personWhoPays"
              readOnly
            />
          </div>

          <div className="w-1/4">
            <InputLabel htmlFor="identificationOfTheDefendant" value="Cédula del demandado" />

            <InputText
              className="mt-1 block w-full"
              id="identificationOfTheDefendant"
              readOnly
            />
          </div>
          <div className="w-1/4">
            <InputLabel htmlFor="numberOperation" value="Número de operación" />

            <InputText
              className="mt-1 block w-full"
              id="numberOperation"
              readOnly
            />
          </div>
          <div className="w-1/4">
            <InputLabel htmlFor="amount" value="Cuantia" />

            <InputText
              className="mt-1 block w-full"
              id="amount"
              readOnly
            />
          </div>
        </div>
        <div className="flex gap-2 items-end">
          <div className="w-1/4">
            <InputLabel htmlFor="relevantInformation" value="Información relevante para facturación" />

            <Dropdown
              className="mt-1 w-full"
              id="relevantInformation"
            />

            <InputError message={errors.relevantInformation} className="mt-2" />
          </div>
          <div className="w-1/4">
            <InputLabel htmlFor="typeOfProcedure" value="Tipo de procedimiento" />

            <Dropdown
              className="mt-1 w-full"
              id="typeOfProcedure"
            />

            <InputError message={errors.typeProcedure} className="mt-2" />
          </div>
          <div className="w-1/4">
            <InputLabel htmlFor="proceduralStage" value="Etapa procesal" />

            <Dropdown
              className="mt-1 w-full"
              id="proceduralStage"
            />

            <InputError message={errors.proceduralStage} className="mt-2" />
          </div>
          <div className="w-1/4">
            <InputLabel htmlFor="responsible" value="Responsable del juicio" />

            <InputText
              className="mt-1 block w-full"
              id="responsible"
              readOnly
            />

            <InputError message={errors.responsible} className="mt-2" />
          </div>
        </div>
      </form>
    </section>
  )
}

export default CreateSingleForm;
