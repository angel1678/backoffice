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
      <div className="flex">
        <div className="mx-auto space-y-6 w-[40rem]">
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
            <CreateMultipleForm
              clientId={clientId}
              executives={executives}
              onErrors={setErrors}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
