import React from 'react';
import { useForm } from '@inertiajs/react';
import { DialogProps } from 'primereact/dialog';
import FormDialog from '@/Components/FormDialog'
import InputLabel from '@/Components/InputLabel';
import { InputText } from 'primereact/inputtext';
import InputError from '@/Components/InputError';

type Props = DialogProps & {
  onSave?: (involved: any) => void;
}

type Status = {
  name?: string;
}


export default function CreateForm({ onSave, onHide, ...props }: Props) {
  const { data, errors, post, reset, setData, transform } = useForm<Status>({ name: '' });

  const handleReject = () => {
    reset();
    onHide();
  };

  const handleAccept = () => {
    onSave && onSave(data);
    reset();
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
          id="name"
          className="mt-1 block w-full"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          required
        />

        <InputError message={errors.name} className="mt-2" />
      </div>
    </FormDialog>
  )
}
