import React from 'react';
import { Link } from '@inertiajs/react';
import ImageButton from '@/Components/ImageButton';

export default function CoerciveClients() {
  const clients = [
    { name: 'CNT', image: '' },
    { name: 'Cerveceria Nacional', image: '' },
  ];

  return (
    <div className="w-auto h-auto m-4 p-4 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <span className="text-3xl font-bold text-gray-500">Clientes</span>
      </div>
      <div className="flex gap-6">
        {
          clients.map(client => (
            <div className="flex flex-col justify-between items-center w-64 h-64 rounded-lg bg-gray-200 p-5">
              <div>{client.name}</div>

              <Link className="text-2xl text-blue-700">Ver más</Link>
            </div>
          ))
        }
        {/* <div className="flex flex-col justify-between items-center w-64 h-64 rounded-lg bg-gray-200 p-5">
          <img src="/img/circle-add.svg" className="w-40 h-40" alt="Agregar" />

          <Link className="text-2xl text-blue-700">Agregar nuevo</Link>
        </div> */}

        <ImageButton
          image="/img/circle-add.svg"
          imageAlt="Agregar"
          linkName="Agregar nuevo"
          linkHref={route('coercive.clients.create')}
        />
      </div>
    </div>
  )
}
