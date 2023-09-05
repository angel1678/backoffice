import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Panel } from 'primereact/panel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { ScrollPanel } from 'primereact/scrollpanel';

const tags = [
  { label: 'Tipo código', value: 'tipo_codigo' },
  { label: 'No. proceso', value: 'numero_proceso' },
  { label: 'Titulo', value: 'titulo' },
  { label: 'Identificación', value: 'identificacion' },
  { label: 'Tipo identificación', value: 'tipo_identificacion' },
];

export default function Index({ auth, ...props }) {
  const refEditor = useRef();
  const { data, setData, errors } = useForm({
    name: '', text: '', params: []
  });

  const handleAddTag = (name) => () => {
    const _quill = refEditor.current.getQuill();
    const selection = _quill.getSelection(true);
    _quill.insertText(selection.index, `[:${name}]`);
  };

  useEffect(() => {
    console.log(data.text);
  }, [data.text]);

  return (
    <AuthenticatedLayout
      auth={auth}
      title="Gestión"
      errors={props.errors}
    >
      <div className="mt-6 mx-2 space-y-6">
        <div className="w-1/3">
          <InputLabel htmlFor="name" value="Nombre de la plantilla" />

          <InputText
            name="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            isFocused
          />

          <InputError message={errors.fileProcesos} className="mt-2" />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <Editor
              ref={e => refEditor.current = e}
              value={data.text}
              onTextChange={(e) => setData('text', e.htmlValue)}
              style={{ height: 'calc(100vh - 18rem)' }}
            />
          </div>
          <div className="w-[30rem]">
            <Panel header={<div className="py-1.5 select-none">Lista de tags del caso</div>}>
              <ScrollPanel style={{ height: 'calc(100vh - 18.3rem)' }}>
                <div className="flex flex-wrap p-2 gap-2">
                  {
                    tags.map(tag => (
                      <div
                        key={tag.value}
                        className="bg-blue-600 p-1 px-3 rounded-xl text-white font-bold cursor-pointer select-none"
                        onDoubleClick={handleAddTag(tag.value)}
                      >
                        {tag.label}
                      </div>
                    ))
                  }

                </div>
              </ScrollPanel>
            </Panel>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
