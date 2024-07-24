import React from 'react';
import { router } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

import Option from './Partials/Option';

const breadCrumb = [
  { label: 'Configuracion', icon: 'home' }
];

type Props = PageProps & {};

export default function Index({ app, auth, errors }: Props) {

  const navigationTo = (to: string) =>
    () => {
      router.visit(route(to));
    };

  return (
    <Authenticated app={app} auth={auth} breadCrumb={breadCrumb} errors={errors} title="Configuración">
      <div style={{ height: 'calc(100vh - 9rem)' }} className="flex flex-col items-center pt-10 gap-5 text-xl">
        <Option title="Usuarios del sistema" onClick={navigationTo('configuration.user.index')} />
        <Option title="Roles del sistema" onClick={navigationTo('configuration.role.index')} />
        <Option title="Empresas que facturan" onClick={navigationTo('configuration.company.index')} />
        <Option title="Tipos de procedimientos y etapas procesales" onClick={navigationTo('configuration.typeOfProcedure.index')} />
      </div>
    </Authenticated>
  )
}
