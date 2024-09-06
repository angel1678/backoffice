import React from 'react';
import dayjs from 'dayjs';
import { router } from '@inertiajs/react';
import { classNames } from 'primereact/utils';

import Icon from '@/Components/Icon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import dateFormatLong from '@/Helper/dateFormatLong';
import { PageProps } from '@/types';

const breadCrumb = [
  { label: 'Inicio', icon: 'home' }
];

type Props = PageProps & {};

export default function Dashboard({ app, auth, movimientos = [], errors }: Props) {
  const dateNow = dayjs();
  const className = 'flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-[#276CE9] to-[#1F47AE] h-72 w-72 shadow-lg rounded-[2.5rem] text-white font-bold text-2xl content-center text-center cursor-pointer';

  const handleVisit = (routeName: string) => () => {
    router.visit(route(routeName))
  };

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Dashboard" breadCrumb={breadCrumb} errors={errors}>
      <div>
        <div className="flex flex-col justify-center px-8 py-5 w-full rounded-xl text-white bg-gradient-to-r from-[#276CE9] to-[#1F47AE]">
          <span className="text-lg font-thin mb-2">{dateFormatLong(dateNow)}</span>
          <span className="text-2xl font-semibold">¡Bienvenido {auth.user.name}!</span>
        </div>
        <div className="flex flex-row justify-evenly items-center" style={{ height: 'calc(100vh - 20rem)' }}>
          <div className={classNames(className)} onClick={handleVisit('judicial.dashboard')}>
            <Icon name="judicial" className="w-32 h-32" />
            <span>JUDICIAL</span>
          </div>
          <div className={classNames(className)} onClick={handleVisit('coercive.clients.index')}>
            <Icon name="coactiva" className="w-32 h-32" />
            <span>COACTIVA</span>
          </div>
          <div className={classNames(className)}>
            <Icon name="facturacion" className="w-32 h-32" />
            <span>FACTURACIÓN Y <br />GASTOS</span>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
