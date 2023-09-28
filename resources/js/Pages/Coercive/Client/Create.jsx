import { useState } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateSingleForm from './Partials/CreateSingleForm';

export default function Create(props) {
  const [errors, setErrors] = useState(undefined);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      title="Cliente de Coactiva"
      urlBack={route('coercive.clients.index')}
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
              <CreateSingleForm
                onErrors={setErrors}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
