import React from 'react';
import { useForm } from '@inertiajs/react';
import { DialogProps } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import FormDialog from '@/Components/FormDialog';
import { InvolvedType } from '@/types';
import { Dropdown } from 'primereact/dropdown';

type Props = DialogProps & {
  defendantsType?: any[];
  type?: InvolvedType;
  onSave?: (involved: any) => void;
}

type Status = {
  name?: string;
  defendantType?: number;
}

export default function CreateInvolvedForm({ defendantsType, type, onSave, onHide, ...props }: Props) {
  const { data, errors, post, reset, setData, transform } = useForm<Status>({
    name: '', defendantType: undefined
  });

  transform(data => ({ ...data, type }));

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

      {type === 'defendant' && (
        <div>
          <InputLabel htmlFor="defendantType" value="Tipo" />

          <Dropdown
            id="defendantType"
            className="mt-1 w-full"
            options={defendantsType}
            value={data.defendantType}
            onChange={e => setData('defendantType', e.target.value)}
            required
          />

          <InputError message={errors.defendantType} className="mt-2" />
        </div>
      )}
    </FormDialog>
  )
}
