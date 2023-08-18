import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';

export default function Dashboard(props) {
  return (
    <AuthenticatedLayout
      auth={props.auth}
      title="Dashboard"
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
    </AuthenticatedLayout>
  );
}
