import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { ScrollPanel } from 'primereact/scrollpanel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DropdownType, PageProps } from '@/types';

import Filters from './Partials/Filters';
import { router } from '@inertiajs/react';
import fileDownload from '@/Helper/fileDownload';

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
  }
}

export default function Dashboard({ app, auth, errors, clients, proceduresType, status, users, report }: Props) {
  const [statu1Cases, setStatu1Cases] = useState({});
  const [statu2Cases, setStatu2Cases] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [data, setData] = useState({});
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

  useEffect(() => {
    if (flatData) {
      const documentStyle = getComputedStyle(document.documentElement);
      const _statu1Cases = {
        items: ['activos', 'pasivos'],
        labels: ['Activos', 'Pasivos'],
        datasets: [
          {
            data: [report.active, report.pasivo],
            backgroundColor: [
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--blue-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--blue-400'),
            ]
          }
        ]
      };

      const _statu2Cases = {
        items: ['congelados', 'nocongelados'],
        labels: ['Congelados', 'No Congelados'],
        datasets: [
          {
            data: [report.congelado, report.nocongelado],
            backgroundColor: [
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--blue-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--blue-400'),
            ]
          }
        ]
      };

      const options = {
        cutout: '60%',
        onClick: handleExportReport,
      };

      setStatu1Cases(_statu1Cases);
      setStatu2Cases(_statu2Cases)
      setChartOptions(options);
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
        <ScrollPanel style={{ height: 'calc(100vh - 9rem)' }}>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center shadow-md rounded-md p-3">
              <div className="self-start font-bold text-xl">Casos Activos / Pasivos</div>
              <Chart type="doughnut" data={statu1Cases} options={chartOptions} className="w-[20rem]" />
            </div>
            <div className="flex flex-col items-center shadow-md rounded-md p-3">
              <div className="self-start font-bold text-xl">Casos Congelados / No Congelados</div>
              <Chart type="doughnut" data={statu2Cases} options={chartOptions} className="w-[20rem]" />
            </div>
          </div>
        </ScrollPanel>
      </div>
    </AuthenticatedLayout>
  );
}
