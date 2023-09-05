import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { ScrollPanel } from 'primereact/scrollpanel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';
import Filters from './Partials/Filters';

export default function Dashboard({ auth, errors }) {
  const [frozenCases, setFrozenCases] = useState({});
  const [reportedCases, setReportedCases] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const _frozenCases = {
      labels: ['No Congelados', 'Congelados'],
      datasets: [
        {
          data: [10, 5],
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

    const _reportedCases = {
      labels: ['No Notificados', 'Notificados'],
      datasets: [
        {
          data: [10, 5],
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
      cutout: '60%'
    };

    setFrozenCases(_frozenCases);
    setReportedCases(_reportedCases)
    setChartOptions(options);
  }, []);
  return (
    <AuthenticatedLayout
      auth={auth}
      title="Dashboard"
      errors={errors}
    >
      <div className="mx-2">
        <Filters className="mb-6" />
        <ScrollPanel style={{ height: 'calc(100vh - 9rem)' }}>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center shadow-md rounded-md p-3">
              <div className="self-start font-bold text-xl">Casos congelados</div>
              <Chart type="doughnut" data={frozenCases} options={chartOptions} className="w-[20rem]" />
            </div>
            <div className="flex flex-col items-center shadow-md rounded-md p-3">
              <div className="self-start font-bold text-xl">Casos notificados</div>
              <Chart type="doughnut" data={reportedCases} options={chartOptions} className="w-[20rem]" />
            </div>
            <div className="flex flex-col items-center shadow-md rounded-md p-3">
              <div className="self-start font-bold text-xl">Casos por etapa</div>
              <Chart type="doughnut" data={frozenCases} options={chartOptions} className="w-[20rem]" />
            </div>
            <div className="flex flex-col items-center shadow-md rounded-md p-3">
              <div className="self-start font-bold text-xl">Cuantía total por etapa</div>
              <Chart type="doughnut" data={frozenCases} options={chartOptions} className="w-[20rem]" />
            </div>
          </div>
        </ScrollPanel>
      </div>
    </AuthenticatedLayout>
  );
}
