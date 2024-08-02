import React, { FormEvent } from 'react';
import { Errors } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { DropdownType } from '@/types';

type Props = {
  className?: string;
  companies?: DropdownType[];
  onErrors: (errors: Errors) => void;
};

type State = {
  clientName: string;
  identification: string;
  billedBy: number;
};

export default function CreateSingleForm({ className, companies, onErrors }: Props) {
  const { data, errors, post, processing, setData, reset } = useForm<State>({
    clientName: '', identification: '', billedBy: 0
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('judicial.client.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => reset(),
      onError: (errors) => onErrors && onErrors(errors),
    });
  };

  return (
    <section className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <InputLabel htmlFor="clientName" value="Nombre del cliente:" />

          <InputText
            id="clientName"
            className="mt-1 block w-full"
            value={data.clientName}
            onChange={e => setData('clientName', e.target.value)}
            required
          />

          <InputError message={errors.clientName} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="identification" value="RUC" />

          <InputText
            id="identification"
            className="mt-1 block w-full"
            value={data.identification}
            onChange={e => setData('identification', e.target.value)}
            keyfilter="pint"
            maxLength={13}
            required
          />

          <InputError message={errors.identification} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="billedBy" value="Facturado por:" />

          <Dropdown
            id="billedBy"
            options={companies}
            className="mt-1 w-full"
            value={data.billedBy}
            onChange={e => setData('billedBy', e.target.value)}
            required
          />

          <InputError message={errors.billedBy} className="mt-2" />
        </div>
        <div>
          <SecondaryButton label="Condición de facturación" className="w-full" />
        </div>
        <div className="pt-6 flex justify-center">
          <PrimaryButton label="Registrar cliente" disabled={processing} />
        </div>
      </form>
    </section>
  )
}
