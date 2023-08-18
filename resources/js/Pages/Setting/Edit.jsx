import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';
import UpdateInformationForm from './Partials/UpdateInformationForm';

export default function Edit({ auth, model }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Setting</h2>}
    >
      <Head title="Setting" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <div className="max-w-xl">
              <UpdateInformationForm model={model} />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}
