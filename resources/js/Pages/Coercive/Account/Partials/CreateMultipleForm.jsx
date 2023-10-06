import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from '@inertiajs/react';
import { MultiSelect } from 'primereact/multiselect';

import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function CreateMultipleForm({ className, clientId, executives, onErrors }) {
  const { data, setData, errors, post, progress } = useForm({
    fileAccounts: null,
    executiveIds: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('coercive.clients.accounts.batchStore', clientId), {
      preserveState: true,
      onError: (errors) => onErrors && onErrors(errors)
    })
  };

  useEffect(() => {
    if (executives.length > 0) {
      setData('executiveIds', executives.map(_ => _.value));
    }
  }, [executives]);

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Proceso Masivo de Coactiva</h2>

        <p className="mt-1 text-sm text-gray-600">
          Agregar nuevas cuentas de coactiva mediante archivo de excel.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="fileAccounts" value="Archivo a procesar" />

          <TextInput
            id="fileAccounts"
            className="mt-1 block w-full"
            type="file"
            onChange={(e) => setData('fileAccounts', e.target.files[0])}
            required
          />

          {progress && (
            <progress value={progress.percentage} max="100">
              {progress.percentage}%
            </progress>
          )}

          <InputError message={errors.fileAccounts} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="executiveIds" value="Ejecutivos" />

          <MultiSelect
            id="executiveIds"
            className="mt-1 w-full dropdown"
            filter
            options={executives}
            value={data.executiveIds}
            onChange={(e) => setData('executiveIds', e.value)}
          />

          <InputError message={errors.executiveIds} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton
            icon="fas fa-save fa-lg"
            label="Guardar"
          />
        </div>
      </form>
    </section>
  )
}

CreateMultipleForm.propTypes = {
  className: PropTypes.string,
  clientId: PropTypes.number.isRequired,
  executives: PropTypes.array.isRequired,
  onErrors: PropTypes.func
}

