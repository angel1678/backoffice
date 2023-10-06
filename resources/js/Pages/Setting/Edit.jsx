import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdateInformationForm from './Partials/UpdateInformationForm';

export default function Edit({ auth, model }) {
  return (
    <AuthenticatedLayout
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
