import React from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogProps } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import FormDialog from '@/Components/FormDialog';

type Props = DialogProps & {
  model?: any;
}

type Status = {
  name?: string;
  nickname?: string;
  email?: string;
}

export default function Create({ model, onHide, ...props }: Props) {
  const { data, errors, post, reset, setData } = useForm<Status>();

  const handleReject = () => {
    reset();
    onHide();
  };

  const handleAccept = () => {
    post(route('configuration.user.store'), {
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
        <InputLabel htmlFor="nickname" value="Username:" />
        <InputText
          className="w-full"
          name="nickname"
          value={data.nickname}
          onChange={e => setData('nickname', e.target.value)}
        />
        <InputError message={errors.name} />
      </div>
      <div>
        <InputLabel htmlFor="email" value="Correo electronico:" />
        <InputText
          className="w-full"
          name="email"
          type="email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
        />
        <InputError message={errors.name} />
      </div>
    </FormDialog>
  )
}
