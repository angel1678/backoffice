import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import UpdateInformationForm from './Partials/UpdateInformationForm';

type Props = PageProps & {
  model: any;
};

export default function Edit({ app, auth, model }: Props) {
  return (
    <AuthenticatedLayout
      app={app}
      auth={auth}
      title="Setting"
      urlBack={route('dashboard')}
    >
      <div className="flex">
        <div className="mx-auto space-y-6 w-[40rem]">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdateInformationForm model={model} />
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}
