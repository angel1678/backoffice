import React, { useState } from 'react';
import { Errors } from '@inertiajs/core';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import CreateSingleForm from './Partials/CreateSingleForm';
import CreateMultipleForm from './Partials/CreateMultipleForm';

type Props = PageProps & {
  clients: any[];
};

export default function Create({ app, auth, clients }: Props) {
  const [errors, setErrors] = useState<Errors>();

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Procesos Judiciales" showBack titleBack="Registro de procesos">
      <div className="flex">
        <div className="mx-auto space-y-6 w-8/12">
          {
            errors &&
            <div className="bg-red-200 sm:rounded-lg w-full p-4">
              <ul>
                {
                  Object.keys(errors).map(error => <li>{errors[error]}</li>)
                }
              </ul>
            </div>
          }

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <CreateSingleForm clients={clients} onErrors={setErrors} />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <CreateMultipleForm onErrors={setErrors} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
