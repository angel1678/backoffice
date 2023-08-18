import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';
import CreateMultipleForm from './Partials/CreateMultipleForm';

export default function Create(props) {
  const [errors, setErrors] = useState(undefined);

  const header = (
    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
      <Link href={route('proceso.index')} className="underline decoration-solid">Procesos Judiciales</Link> \ Create
    </h2>
  );

  return (
    <AuthenticatedLayout
      auth={props.auth}
      title="Procesos Judiciales"
      header={header}
    >
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
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
            <div className="max-w-xl">
              <CreateMultipleForm
                clients={props.clients}
                executives={props.executives}
                onErrors={setErrors}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
