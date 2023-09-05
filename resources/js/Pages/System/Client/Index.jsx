import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';

export default function Index({ auth, clients, errors }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      title="Client"
      errors={errors}
    >
    </AuthenticatedLayout>
  )
}
