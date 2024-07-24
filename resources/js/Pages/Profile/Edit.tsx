import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { PageProps } from '@/types';

type Props = PageProps & {
  mustVerifyEmail: string;
  status: string;
}

export default function Edit({ app, auth, mustVerifyEmail, status }: Props) {
  return (
    <AuthenticatedLayout
      app={app}
      auth={auth}
      title="Profile"
      urlBack={route('dashboard')}
    >
      <div className="flex">
        <div className="mx-auto space-y-6 w-[40rem]">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
