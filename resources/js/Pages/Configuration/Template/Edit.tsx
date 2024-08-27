import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { router, useForm } from '@inertiajs/react';

import { ContextMenu } from 'primereact/contextmenu';
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';

import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import useQuill from '@/Hook/useQuill';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, DropdownType } from '@/types';
import { InputSwitch } from 'primereact/inputswitch';

type Props = PageProps & {
  model: { id: string, name: string, template: string }
  params: DropdownType[];
};

type State = {
  name: string;
  text?: string;
};

export default function Edit({ app, auth, model, params, ...props }: Props) {
  const refEditor = useRef<Editor | null>(null);
  const { modules, renderHeader } = useQuill(refEditor);

  const [name, setName] = useState<string>(model?.name);
  const [text, setText] = useState<string>(model?.template);

  const handleAddTag = (name: any) => () => {
    const _quill = refEditor.current?.getQuill();
    const selection = _quill.getSelection(true);
    _quill.insertText(selection.index, `{{${name}}}`, 'api');
  };

  const handleSave = () => {
    router.put(route('configuration.template.update', model?.id), { name, text }, {
      preserveState: true,
      onSuccess: console.log,
    });
  };

  return (
    <AuthenticatedLayout app={app} auth={auth} title="Plantilla" showBack titleBack="Crear Plantilla" errors={props.errors}>
      <div className="mt-6 mx-2 space-y-6">
        <div className="flex justify-between">
          <div className="flex gap-2 w-2/3">
            <div className="w-1/3">
              <InputLabel htmlFor="name" value="Nombre de la plantilla" />

              <InputText
                name="name"
                className="mt-1 block w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* <InputError message={errors.name} className="mt-2" /> */}
            </div>
            <div className="flex flex-col justify-center w-1/3">
              <InputLabel htmlFor="active" value="Estado" />

              <div className="flex h-full items-center">
                <InputSwitch checked />
              </div>
              {/* <InputError message={errors.name} className="mt-2" /> */}
            </div>
          </div>
          <div className="w-1/3 flex justify-end items-center">
            <div>
              <PrimaryButton label="Guardar" onClick={handleSave} />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <Editor
              ref={refEditor}
              value={text}
              onTextChange={e => setText(e.htmlValue!)}
              style={{ height: 'calc(100vh - 19rem)' }}
              headerTemplate={renderHeader()}
              modules={modules}
            />
          </div>
          <div className="w-[30rem]">
            <Panel header={<div className="py-1.5 select-none">Lista de tags del caso</div>}>
              <ScrollPanel style={{ height: 'calc(100vh - 19.3rem)' }}>
                <div className="flex flex-wrap p-2 gap-2">
                  {
                    params.map(tag => (
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

