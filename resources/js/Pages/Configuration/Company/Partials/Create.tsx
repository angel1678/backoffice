import React from 'react';
import { useForm } from '@inertiajs/react';
import { DialogProps } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import FormDialog from '@/Components/FormDialog';

type Props = DialogProps & {
  model?: any;
}

type Status = {
  name?: string;
  ruc?: string;
}

export default function Create({ model, onHide, ...props }: Props) {
  const { data, errors, post, reset, setData } = useForm<Status>();

  const handleReject = () => {
    reset();
    onHide();
  };

  const handleAccept = () => {
    post(route('configuration.company.store'), {
      preserveState: true,
      onSuccess: () => handleReject(),
    })
  };

  return (
    <FormDialog
      {...props}
      style={{ width: '30rem' }}
      onAccept={handleAccept}
      onHide={handleReject}
      onReject={handleReject}
    >
      <div>
        <InputLabel htmlFor="name" value="Nombre:" />
        <InputText
          className="w-full"
          name="name"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
        />
        <InputError message={errors.name} />
      </div>
      <div>
        <InputLabel htmlFor="ruc" value="RUC:" />
        <InputText
          className="w-full"
          name="ruc"
          value={data.ruc}
          onChange={e => setData('ruc', e.target.value)}
          keyfilter="pint"
          maxLength={13}
          required
        />
        <InputError message={errors.ruc} />
      </div>
    </FormDialog>
  )
}
