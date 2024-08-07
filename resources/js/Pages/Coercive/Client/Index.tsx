import React from 'react';
import ImageButton from '@/Components/ImageButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useAuth from '@/Hook/useAuth';
import { PageProps } from '@/types';

const breadCrumb = [
  { label: 'Coactiva', icon: 'coactiva' },
];

type Props = PageProps & {
  clients: any[];
}

export default function Index({ app, auth, clients, errors }: Props) {
  const { hasRol } = useAuth();
  const isAdmin = hasRol('admin');

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Coactiva" breadCrumb={breadCrumb} errors={errors}>
      <div className="bg-white overflow-hidden shadow-lg rounded-lg m-4 p-6 w-auto" style={{ height: 'calc(100vh - 10rem)' }}>
        <div className="mb-6 text-center">
          <span className="text-3xl font-bold text-gray-500">Clientes</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {
            clients.map(client => (
              <ImageButton
                key={client.id}
                image={`/coercive/client/${client.image}`}
                imageAlt={client.name}
                linkName="Ver más"
                linkHref={route('coercive.clients.accounts.index', client.id)}
              />
            ))
          }
          {isAdmin &&
            <ImageButton
              className="!bg-[#DBECFE]"
              image="/img/circle-add.svg"
              imageAlt="Agregar"
              linkName="Agregar nuevo"
              linkHref={route('coercive.clients.create')}
            />
          }
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
