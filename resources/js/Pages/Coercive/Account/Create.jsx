import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateMultipleForm from './Partials/CreateMultipleForm';

export default function Create({ auth, clientId, executives }) {
  const [errors, setErrors] = useState(undefined);

  return (
    <AuthenticatedLayout
      auth={auth}
      title="Procesos Judiciales"
      urlBack={route('coercive.clients.accounts.index', clientId)}
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

          <div className="p-4 sm:p-8 bg-white shadow-lg sm:rounded-lg">
            <div className="max-w-xl">
              <CreateMultipleForm
                clientId={clientId}
                executives={executives}
                onErrors={setErrors}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
