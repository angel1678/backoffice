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
import Icon from '@/Components/Icon';

type Props = PageProps & {
  templates: DropdownType[];
  movimients: DropdownType[];
  judicialMovimientId?: string;
  references: {
    phone: string;
    email: string;
    web_page: string;
  }
};

type State = {
  judicialMovimientId?: string;
  templateId?: string;
};

export default function Create({ app, auth, movimients, templates, judicialMovimientId, references }: Props) {
  const refEditor = useRef<Editor | null>(null);
  const { modules, renderHeader } = useQuill(refEditor);
  const { data, get, errors, setData, submit } = useForm<State>({ judicialMovimientId });

  const [text, setText] = useState<string>();

  const handleAdministrarTemplate = () => {
    router.visit(route('configuration.template.index'));
  }

  const headerTemplate = (
    <div className="flex justify-end w-full">
      <PrimaryButton label="Administrar plantillas" onClick={handleAdministrarTemplate} />
    </div>
  );

  const handleSave = () => {
    router.post(route('judicial.template.store'), { ...data, text }, {
      preserveState: true,
    });
  };

  const handleExport = () => {
    router.post(route('judicial.template.export', [data.templateId]), { judicialMovimientIds: [data.judicialMovimientId], text }, {
      preserveState: true,
      onSuccess: fileDownload('urlTemplate'),
    });
  };

  useEffect(() => {
    if (data.judicialMovimientId && data.templateId) {
      get(route('judicial.template.show', data.templateId), {
        preserveState: true,
        onSuccess: ({ props }) => {
          const { template } = props as any;
          setText(template);
        }
      })
    }
  }, [data.judicialMovimientId, data.templateId]);

  return (
    <Authenticated app={app} auth={auth} title="Plantillas" titleBack="Plantillas" header={headerTemplate} showBack errors={errors}>
      <div className="flex flex-col w-full items-center gap-2">
        <div className="max-w-7xl w-full px-4 py-6 rounded-md bg-white">
          <div className="flex justify-between">
            <div className="flex gap-3">
              {!judicialMovimientId && (
                <div>
                  <Dropdown
                    className="w-72"
                    options={movimients}
                    placeholder="Seleccionar un proceso"
                    name="judicialMovimientId"
                    value={data.judicialMovimientId}
                    onChange={e => setData('judicialMovimientId', e.value)}
                  />
                  <InputError message={errors.judicialMovimientId} />
                </div>
              )}
              <div>
                <Dropdown
                  className="w-72"
                  options={templates}
                  placeholder="Seleccionar la Plantilla"
                  name="templateId"
                  value={data.templateId}
                  onChange={e => setData('templateId', e.value)}
                />
                <InputError message={errors.templateId} />
              </div>
            </div>

            <div className="flex gap-3">
              <PrimaryButton label="Guardar" icon={<Icon name="guardar-plantilla" className="h-6 mr-1" />} disabled={!text} onClick={handleSave} />
              <PrimaryButton label="Exportar" icon={<Icon name="descarga-reporte" className="h-6 mr-1" />} disabled={!text} onClick={handleExport} />
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-slate-400 w-full h-screen py-8">
          <div className="bg-white h-full w-full max-w-6xl">
            <div className="flex justify-end w-full">
              <img src="/img/logo-black.png" className="w-80 h-28 mr-28" />
            </div>
            <div>
              <Editor
                ref={refEditor}
                value={text}
                onTextChange={e => setText(e.htmlValue!)}
                style={{ height: 'calc(100vh - 23rem)' }}
                headerTemplate={renderHeader()}
                modules={modules}
              />
            </div>
            <div className="flex flex-col items-center my-6">
              <div>Kennedy Norte, Av. Luis Orrantia Cornejo y Calle 13A; Edificio Atlas Bco Pichincha, Torre Atlas, piso 10 oficina 01.</div>
              <div className="flex gap-12">
                <span>Teléfono: {references.phone}</span>
                <span>{references.web_page}</span>
                <span>Email: {references.email}</span>
              </div>
              <div>Guayaquil – Ecuador</div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
