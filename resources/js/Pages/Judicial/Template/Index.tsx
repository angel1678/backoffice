import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';

type Props = PageProps & {
};

export default function Index({ app, auth, errors }: Props) {

  const handleIndividuales = () =>
    router.visit(route('judicial.template.create'));

  const handleMasivo = () =>
    router.visit(route('judicial.template.createBatch'));

  return (
    <Authenticated app={app} auth={auth} title="Gestión de Plantillas" titleBack="Gestión de Plantillas" showBack errors={errors}>
      <div className="flex items-center" style={{ height: 'calc(100vh - 15rem)' }}>
        <div className="flex gap-12 justify-center w-full">
          <PrimaryButton className="w-72 justify-center" onClick={handleIndividuales}>
            <span className="text-2xl">Individuales</span>
          </PrimaryButton>
          <PrimaryButton className="w-72 justify-center" onClick={handleMasivo}>
            <span className="text-2xl">Masivo</span>
          </PrimaryButton>
        </div>
      </div>
    </Authenticated>
  )
}
