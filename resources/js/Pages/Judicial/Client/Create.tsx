import React, { useState } from 'react';
import { Errors } from '@inertiajs/core';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import CreateSingleForm from './Partials/CreateSingleForm';

type Props = PageProps & {
  users: any[];
};

export default function Create({ app, auth, users }: Props) {
  const [errors, setErrors] = useState<Errors>();

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Nuevo cliente" showBack titleBack="Registro de nuevo cliente">
      <div className="flex">
        <div className="mx-auto space-y-6 w-4/12">
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
            <CreateSingleForm users={users} onErrors={setErrors} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
