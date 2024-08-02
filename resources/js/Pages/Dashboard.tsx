import React from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { classNames } from 'primereact/utils';

const breadCrumb = [
  { label: 'Inicio', icon: 'home' }
];

type Props = PageProps & {};

export default function Dashboard({ app, auth, movimientos = [], errors }: Props) {
  const className = 'bg-gradient-to-r from-[#276CE9] to-[#1F47AE] h-72 w-72 shadow-lg rounded-[2.5rem] text-white font-bold text-2xl content-center text-center cursor-pointer';

  const handleVisit = (routeName: string) => () => {
    router.visit(route(routeName))
  };

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Dashboard" breadCrumb={breadCrumb} errors={errors}>
      <div className="flex flex-row justify-around items-center" style={{ height: 'calc(100vh - 13rem)' }}>
        <div className={classNames(className)} onClick={handleVisit('judicial.dashboard')}>
          <span>JUDICIAL</span>
        </div>
        <div className={classNames(className)} onClick={handleVisit('coercive.clients.index')}>
          <span>COACTIVA</span>
        </div>
        <div className={classNames(className)}>
          <span>FACTURACIÓN Y <br />GASTOS</span>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
