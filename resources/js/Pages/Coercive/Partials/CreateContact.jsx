import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { TreeSelect } from 'primereact/treeselect';

import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

const validation = {
  1: { keyfilter: 'pint', maxLength: 7 },
  2: { keyfilter: 'pint', maxLength: 10 },
  3: { keyfilter: 'pint', maxLength: 10 },
  4: { keyfilter: 'email', maxLength: 300 },
  5: { keyfilter: /[A-Za-z ]*/g, maxLength: 300 },
  5: { keyfilter: /[A-Za-z ]*/g, maxLength: 300 },
}

export default function CreateContact({ accountId, types = [], locations = [], visible, onHide }) {
  const { data, setData, errors, post, progress } = useForm({
    typeId: 0,
    location: 0,
    value: '',
    observation: '',
  });

  const handleChangeTypeContact = (e) => {
    setData({ typeId: e.target.value, location: 0, value: '', observation: '' });
  }

  const handleSubmit = () => {
    post(route('coercive.accounts.contacts.store', accountId), {
      preserveState: true,
      onSuccess: (response) => {
        onHide();
      },
    })
  };

  const footer = (
    <div>
      <Button label="Cancelar" onClick={onHide} className="p-button-text p-button-danger" />
      <Button label="Guardar" icon="pi pi-save" iconPos="right" disabled={progress} onClick={handleSubmit} autoFocus />
    </div>
  );

  return (
    <Dialog
      header="Agregar contacto"
      style={{ width: '25vw' }}
      footer={footer}
      visible={visible}
      onHide={onHide}
    >
      <div className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="typeId" value="Tipo de contacto" />

          <Dropdown
            id="typeId"
            className="mt-1 w-full dropdown"
            options={types}
            placeholder="Seleccione una opción"
            value={data.typeId}
            onChange={handleChangeTypeContact}
            required
          />

          <InputError message={errors.typeId} className="mt-2" />
        </div>
        {[5, 6].includes(data.typeId) &&
          <div>
            <InputLabel htmlFor="localidad" value="Localidad" />

            <TreeSelect
              id="localidad"
              className="mt-1 w-full dropdown"
              filter
              options={locations}
              placeholder="Seleccione una opción"
              value={data.location}
              onChange={(e) => setData('location', e.value)}
            />

            <InputError message={errors.localidad} className="mt-2" />
          </div>
        }
        <div>
          <InputLabel htmlFor="value" value="Dato" />

          <InputText
            id="value"
            className="mt-1 w-full h-9 !px-2"
            value={data.value}
            onChange={(e) => setData('value', e.target.value)}
            required
            keyfilter={validation[data.typeId]?.keyfilter || null}
            maxLength={validation[data.typeId]?.maxLength || 300}
          />

          <InputError message={errors.valor} className="mt-2" />
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
