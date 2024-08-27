import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';

import PrimaryButton from '@/Components/PrimaryButton';
import useQuill from '@/Hook/useQuill';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { DropdownType, PageProps } from '@/types';
import { Link, router, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import fileDownload from '@/Helper/fileDownload';
import { MultiSelect } from 'primereact/multiselect';
import InputLabel from '@/Components/InputLabel';
import Icon from '@/Components/Icon';

type Props = PageProps & {
  movimients: DropdownType[];
  templates: DropdownType[];
};

type State = {
  judicialMovimientIds: string[];
  templateId: string;
};

export default function CreateBatch({ app, auth, movimients, templates }: Props) {
  const { data, get, errors, setData, submit } = useForm<State>();

  const handleExport = () => {
    router.post(route('judicial.template.export', [data.templateId]), { judicialMovimientIds: data.judicialMovimientIds, text: null }, {
      preserveState: true,
      onSuccess: fileDownload('urlTemplate'),
    });
  };

  return (
    <Authenticated app={app} auth={auth} title="Plantillas" titleBack="Gestión de Plantillas" showBack errors={errors}>
      <div className="flex flex-col w-full items-center gap-2">
        <div className="max-w-7xl w-1/2 px-4 py-6 rounded-md bg-white">
          <div className="flex flex-col gap-8 items-center">
            <div>
              <InputLabel value="Procesos" />
              <MultiSelect
                className="w-[40rem]"
                filter
                options={movimients}
                placeholder="Seleccionar un proceso"
                name="judicialMovimientIds"
                value={data.judicialMovimientIds}
                onChange={e => setData('judicialMovimientIds', e.value)}
              />
              <InputError message={errors.judicialMovimientIds} />
            </div>

            <div>
              <InputLabel value="Plantillas a ejecutar" />
              <Dropdown
                className="w-[40rem]"
                options={templates}
                placeholder="Seleccionar la Plantilla"
                name="templateId"
                value={data.templateId}
                onChange={e => setData('templateId', e.value)}
              />
              <InputError message={errors.templateId} />
            </div>

            <div className="mt-12">
              <PrimaryButton label="Exportar" icon={<Icon name="descarga-reporte" className="h-6 mr-1" />} onClick={handleExport} />
            </div>
          </div>
        </div>
      </div>
    </Authenticated >
  )
}
