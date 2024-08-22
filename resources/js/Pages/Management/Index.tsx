import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

import { ContextMenu } from 'primereact/contextmenu';
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { PageProps } from '@/types';
import useQuill from '@/Hook/useQuill';
import Quill from 'quill';

const tags = [
  { label: 'Tipo código', value: 'tipo_codigo' },
  { label: 'No. proceso', value: 'numero_proceso' },
  { label: 'Titulo', value: 'titulo' },
  { label: 'Identificación', value: 'identificacion' },
  { label: 'Tipo identificación', value: 'tipo_identificacion' },
];

type Props = PageProps & {
};

type State = {
  name: string;
  text?: string;
  params: any[];
};

export default function Index({ app, auth, ...props }: Props) {
  const refEditor = useRef<Editor | null>(null);
  const { modules, renderHeader } = useQuill(refEditor);

  const cm = useRef<ContextMenu | null>(null);
  const items = [
    { label: 'View', icon: 'pi pi-fw pi-search' },
    { label: 'Delete', icon: 'pi pi-fw pi-trash' }
  ];

  const { data, setData, errors } = useForm<State>({
    name: '', text: '', params: []
  });

  const handleAddTag = (name: any) => () => {
    const _quill = refEditor.current?.getQuill();
    const selection = _quill.getSelection(true);
    _quill.insertText(selection.index, `{{${name}}}`, 'api');
  };

  const handleChange = (e: EditorTextChangeEvent) => setData('text', e.htmlValue!);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code = '{') {
      cm.current?.show(e);
    }
  };

  useEffect(() => {
    console.log(data.text);
  }, [data.text]);

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Gestión" errors={props.errors}>
      <div className="mt-6 mx-2 space-y-6">
        <div className="w-1/3">
          <InputLabel htmlFor="name" value="Nombre de la plantilla" />

          <InputText
            name="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <ContextMenu model={items} ref={cm} breakpoint="767px" />
            <Editor
              ref={refEditor}
              value={data.text}
              onTextChange={handleChange}
              onKeyUp={handleKeyDown}
              style={{ height: 'calc(100vh - 18rem)' }}
              headerTemplate={renderHeader()}
              modules={modules}
              onContextMenu={(e) => cm.current?.show(e)}
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
