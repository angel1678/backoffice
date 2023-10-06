import { useState } from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EditSingleForm from './Partials/EditSingleForm';

export default function Edit(props) {
  const [errors, setErrors] = useState(undefined);

  const header = (
    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
      <Link href={route('proceso.index')} className="underline decoration-solid">Procesos Judiciales</Link> \ Edit
    </h2>
  );

  return (
    <AuthenticatedLayout
      auth={props.auth}
      title="Procesos Judiciales"
      urlBack={route('proceso.index')}
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
            <EditSingleForm users={props.users} model={props.model} onErrors={setErrors} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
