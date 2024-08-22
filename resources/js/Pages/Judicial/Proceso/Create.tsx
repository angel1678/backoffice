import React, { useState } from 'react';
import { Errors } from '@inertiajs/core';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DropdownType, PageProps } from '@/types';

import CreateSingleForm from './Partials/CreateSingleForm';
import CreateMultipleForm from './Partials/CreateMultipleForm';

type Props = PageProps & {
  actors: DropdownType[];
  clients: DropdownType[];
  clientSelected: number;
  defaultUserId: number;
  defendants: DropdownType[];
  personWhoPays: DropdownType[];
  proceduresType: DropdownType[];
  relevantInformation: DropdownType[];
  users: DropdownType[];
};

export default function Create({ actors, app, auth, clients, clientSelected, defaultUserId, defendants, personWhoPays, proceduresType, relevantInformation, users }: Props) {
  const [errors, setErrors] = useState<Errors>();

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Procesos Judiciales" showBack titleBack="Registro de procesos">
      <div className="flex">
        <div className="mx-auto space-y-6 w-9/12 pb-12">
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
            <CreateSingleForm
              actors={actors}
              clients={clients}
              clientSelected={clientSelected}
              defaultUserId={defaultUserId}
              defendants={defendants}
              personWhoPays={personWhoPays}
              proceduresType={proceduresType}
              relevantInformation={relevantInformation}
              users={users}
              onErrors={setErrors}
            />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <CreateMultipleForm
              clients={clients}
              defaultUserId={defaultUserId}
              users={users}
              onErrors={setErrors}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
