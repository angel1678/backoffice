import React, { useEffect, useLayoutEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Chart } from 'primereact/chart';

import fileDownload from '@/Helper/fileDownload';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DropdownType, PageProps } from '@/types';

import Filters from './Partials/Filters';

import { ChartOptions } from 'chart.js';


const breadCrumb = [
  { label: 'Reporte', icon: 'reporteria' }
];

type Props = PageProps & {
  clients: DropdownType[];
  proceduresType: DropdownType[];
  status: DropdownType[];
  users: DropdownType[];
  report: {
    active: number,
    pasivo: number,
    congelado: number,
    nocongelado: number,
  },
  reportByClient: {
    ids: any[],
    labels: any[],
    values: any[],
  },
  reportByUser: {
    ids: any[],
    labels: any[],
    values: any[],
  },
  reportByProcedureType: {
    ids: any[],
    labels: any[],
    values: any[],
  }
  reportByProcedureStage: {
    ids: any[],
    labels: any[],
    values: any[],
  }
}

export default function Dashboard({ app, auth, errors, clients, proceduresType, status, users, report, reportByClient, reportByUser, reportByProcedureType, reportByProcedureStage }: Props) {
  const [statu1Cases, setStatu1Cases] = useState({});
  const [statu2Cases, setStatu2Cases] = useState({});
  const [clientsCases, setClientsCases] = useState({});
  const [usersCases, setUsersCases] = useState({});
  const [procedureTypeCases, setProcedureTypeCases] = useState({});
  const [procedureStageCases, setProcedureStageCases] = useState({});

  const [doughnutOptions, setDoughnutOptions] = useState({});
  const [barOptions, setBarOptions] = useState({});

  const [data, setData] = useState<any>({});
  const [flatData, setFlatData] = useState<boolean>(true);

  const handleExportReport = (event: any, elements: any, chart: any) => {
    const i = elements[0].index;
    report = chart.data.items[i];
    router.post(route('process.report.export'), { ...data, report }, {
      preserveState: true,
      onStart: () => setFlatData(false),
      onSuccess: fileDownload()
    });
  };

  useLayoutEffect(() => {
    if (flatData) {
      const documentStyle = getComputedStyle(document.documentElement);
      const _statu1Cases = {
        items: ['activos', 'pasivos'],
        labels: ['Activos', 'Pasivos'],
        datasets: [
          {
            data: [report.active, report.pasivo],
          }
        ]
      };

      const _statu2Cases = {
        items: ['congelados', 'nocongelados'],
        labels: ['Congelados', 'No Congelados'],
        datasets: [
          {
            data: [report.congelado, report.nocongelado],
          }
        ]
      };

      const _clientsCases = {
        items: reportByClient.ids,
        labels: reportByClient.labels,
        datasets: [
          {
            data: reportByClient.values,
          }
        ]
      };

      const _usersCases = {
        items: reportByUser.ids,
        labels: reportByUser.labels,
        datasets: [
          {
            data: reportByUser.values,
            borderWidth: 1
          }
        ]
      };

      const _procedureTypeCases = {
        items: reportByProcedureType.ids,
        labels: reportByProcedureType.labels,
        datasets: [
          {
            data: reportByProcedureType.values,
            borderWidth: 1
          }
        ]
      };

      const _procedureStageCases = {
        items: reportByProcedureStage.ids,
        labels: reportByProcedureStage.labels,
        datasets: [
          {
            data: reportByProcedureStage.values,
            borderWidth: 1
          }
        ]
      };

      const doughnutOptions = {
        onClick: handleExportReport,
        plugins: {
          colors: {
            forceOverride: true
          }
        }
      };

      const barOptions: ChartOptions = {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        // onClick: handleExportReport,
        plugins: {
          legend: { display: false },
          colors: {
            forceOverride: true
          },
        }
      };

      setStatu1Cases(_statu1Cases);
      setStatu2Cases(_statu2Cases);
      setClientsCases(_clientsCases);
      setUsersCases(_usersCases);
      setProcedureTypeCases(_procedureTypeCases);
      setProcedureStageCases(_procedureStageCases);
      setDoughnutOptions(doughnutOptions);
      setBarOptions(barOptions);
    }
  }, [report]);

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Dashboard" breadCrumb={breadCrumb} errors={errors}>
      <div className="mx-2">
        <Filters
          className="mb-6"
          clients={clients}
          proceduresType={proceduresType}
          status={status}
          users={users}
          onChange={e => setData(e)}
          onSearch={() => setFlatData(true)}
        />
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center shadow-md rounded-md p-3">
            <div className="self-start font-bold text-xl">Procesos por Clientes</div>
            <Chart type="doughnut" data={clientsCases} options={doughnutOptions} className="w-[20rem]" />
          </div>
          <div className="flex flex-col items-center shadow-md rounded-md p-3">
            <div className="self-start font-bold text-xl">Casos Activos / Pasivos</div>
            <Chart type="doughnut" data={statu1Cases} options={doughnutOptions} className="w-[20rem]" />
          </div>
          <div className="flex flex-col items-center shadow-md rounded-md p-3">
            <div className="self-start font-bold text-xl">Casos Congelados / No Congelados</div>
            <Chart type="doughnut" data={statu2Cases} options={doughnutOptions} className="w-[20rem]" />
          </div>
          <div className="flex flex-col items-center shadow-md rounded-md p-3">
            <div className="self-start font-bold text-xl">Procesos por Tipo de Procedimiento</div>
            <Chart type="bar" data={procedureTypeCases} options={barOptions} className="w-[40rem]" />
          </div>
          {data?.procedureTypeId && (
            <div className="flex flex-col items-center shadow-md rounded-md p-3">
              <div className="self-start font-bold text-xl">Procesos por Estado del Procedimiento</div>
              <Chart type="bar" data={procedureStageCases} options={barOptions} className="w-[40rem]" />
            </div>
          )}
          <div className="flex flex-col items-center shadow-md rounded-md p-3">
            <div className="self-start font-bold text-xl">Procesos por Usuario</div>
            <Chart type="bar" data={usersCases} options={barOptions} className="w-[40rem]" />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
