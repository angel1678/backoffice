import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function DeleteContact({ accountId, contactId, visible, onHide }) {
  const { data, setData, errors, delete: destroy, progress } = useForm({
    observation: '',
  });

  const handleSubmit = () => {
    destroy(route('coercive.accounts.contacts.destroy', [accountId, contactId]), {
      preserveState: true,
      onSuccess: (response) => {
        onHide();
      },
    })
  };

  const footer = (
    <div>
      <Button label="Cancelar" onClick={onHide} className="p-button-text p-button-danger" />
      <Button label="Aceptar" icon="pi pi-check" iconPos="right" disabled={progress} onClick={handleSubmit} autoFocus />
    </div>
  );

  return (
    <Dialog
      header="Eliminar contacto"
      style={{ width: '25vw' }}
      footer={footer}
      visible={visible}
      onHide={onHide}
    >
      <div className="space-y-6">
        <div>
          <div className="text-lg">¿Esta seguro de eliminar el contacto?</div>
          <span className="text-sm">
            En caso de ser afirmativo debe ingresar un observación.
          </span>
        </div>
        <div>
          <InputLabel htmlFor="observation" value="Observación" />

          <InputTextarea
            id="observation"
            className="mt-1 w-full !px-2"
            value={data.observation}
            onChange={(e) => setData('observation', e.target.value)}
            required
          />

          <InputError message={errors.observation} className="mt-2" />
        </div>
      </div>
    </Dialog>
  )
}
