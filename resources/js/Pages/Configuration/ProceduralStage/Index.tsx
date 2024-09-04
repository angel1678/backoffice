import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { DropdownType, PageProps } from '@/types';
import { classNames } from 'primereact/utils';
import SecondaryButton from '@/Components/SecondaryButton';
import { confirmDialog } from 'primereact/confirmdialog';

type Props = PageProps & {
  typeProcedures: Dropdown[];
};

type Status = {
  typeOfProcedure?: number;
  procedureStage?: number;
}

export default function Index({ app, auth, typeProcedures }: Props) {
  const { data, errors, post, reset, setData } = useForm<Status>();
  const [proceduralStage, setProceduralStage] = useState<DropdownType[]>();
  const [proceduralStageSelect, setProceduralStageSelect] = useState<DropdownType | null>(null);
  const [addProceduralStage, setAddProceduralStage] = useState<boolean>(false);

  const [proceduralType, setProceduralType] = useState<string>('');

  const handleStoreProcedureType = (name: string, procedureType?: any, addButton?: boolean) => {
    router.post(route('configuration.proceduralStage.store', procedureType), { name }, {
      preserveState: true,
      onSuccess: ({ props }) => {
        console.log(props);
        setProceduralType('');
        if (addButton) {
          setAddProceduralStage(false);
          setProceduralStage((props as any).proceduralStage);
        }
      }
    });
  };

  const typeOfProcedureFooterTemplate = (
    <div className="flex justify-between gap-2 p-2">
      <InputText className="w-[75%]" value={proceduralType} onChange={e => setProceduralType(e.target.value)} />
      <PrimaryButton label="Agregar" onClick={() => handleStoreProcedureType(proceduralType)} />
    </div>
  );

  const handleChangeTypeOfProcedure = (e: DropdownChangeEvent) => {
    setData('typeOfProcedure', e.value);
    router.get(route('configuration.proceduralStage.index'), { procedureType: e.value }, {
      preserveState: true,
      onSuccess: ({ props }) => {
        const { proceduralStage } = props as any;
        setProceduralStage(proceduralStage);
      },
    });
  };

  const handleUpdateTypeOfProcedure = () => {
    router.put(
      route('configuration.proceduralStage.update', { procedureType: proceduralStageSelect?.value }),
      { name: proceduralStageSelect?.label },
      {
        preserveState: true,
        onSuccess: ({ props }) => {
          const { proceduralStage } = props as any;
          setProceduralStage(proceduralStage);
          setProceduralStageSelect(null);
        }
      }
    );
  };

  const handleDestroyTypeOfProcedure = (item: DropdownType) => {
    confirmDialog({
      header: 'Eliminar Tipo',
      message: `Esta seguro de eliminar la empresa ${item.label}`,
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        router.delete(route('configuration.proceduralStage.destroy', item.value), {
          preserveState: true,
          onSuccess: ({ props }) => {
            const { proceduralStage } = props as any;
            setProceduralStage(proceduralStage);
          }
        });
      },
    });
  };

  return (
    <Authenticated app={app} auth={auth} errors={errors} showBack title="Etapa Procesal">
      <div className="flex flex-col items-center gap-4">
        <div className="w-1/3">
          <InputLabel htmlFor="typeOfProcedure" value="Tipo de Procedimiento:" />
          <Dropdown
            className="w-full mt-2"
            name="typeOfProcedure"
            options={typeProcedures}
            value={data.typeOfProcedure}
            onChange={handleChangeTypeOfProcedure}
            panelFooterTemplate={typeOfProcedureFooterTemplate}
          />
          <InputError message={errors.typeOfProcedure} />
        </div>
        <div className="w-1/3">
          <InputLabel htmlFor="proceduralStage" value="Etapa Procesal:" />
          <div className="flex flex-col justify-between bg-white w-full h-[calc(100vh-18rem)] mt-2 px-4 rounded-2xl">
            <div className="self-end mt-3 mb-1 bg-red-500">
              <PrimaryButton icon="pi pi-plus" className="!p-1 !w-8" onClick={() => setAddProceduralStage(true)} />
            </div>
            <div className="h-full">
              {
                proceduralStage?.map((item, index) => (
                  <div key={item.value} className={classNames('flex items-center justify-between p-2 cursor-pointer group', { 'border-t': index > 0 })}>
                    {proceduralStageSelect?.value == item.value
                      ? (
                        <>
                          <InputText
                            className="w-full h-9 mr-4"
                            value={proceduralStageSelect?.label}
                            onChange={e =>
                              proceduralStageSelect &&
                              setProceduralStageSelect({ label: e.target.value, value: proceduralStageSelect?.value })
                            }
                          />
                          <div className="flex gap-1">
                            <SecondaryButton severe="info" icon="pi pi-check" className="!p-1 !w-8" onClick={handleUpdateTypeOfProcedure} />
                            <SecondaryButton severe="help" icon="pi pi-times" className="!p-1 !w-8" onClick={() => setProceduralStageSelect(null)} />
                          </div>
                        </>
                      )
                      : (
                        <>
                          <span>{item.label}</span>
                          <div className={classNames("flex gap-1 invisible", { 'group-hover:visible': proceduralStageSelect == null })}>
                            <SecondaryButton
                              severe="info"
                              icon="pi pi-pencil"
                              className="!p-1 !w-8"
                              onClick={() => setProceduralStageSelect(item)}
                            />

                            <SecondaryButton
                              severe="help"
                              icon="pi pi-trash"
                              className="!p-1 !w-8"
                              onClick={() => handleDestroyTypeOfProcedure(item)}
                            />
                          </div>
                        </>
                      )
                    }

                  </div>
                ))
              }
            </div>
            <div className="mb-4">
              {addProceduralStage && (
                <div className="flex gap-2">
                  <InputText className="w-full h-9" value={proceduralType} onChange={e => setProceduralType(e.target.value)} />
                  <div className="flex gap-2">
                    <SecondaryButton
                      severe="info"
                      icon="pi pi-check"
                      className="!p-1 !w-8"
                      onClick={() => handleStoreProcedureType(proceduralType, data?.typeOfProcedure, true)}
                    />
                    <SecondaryButton
                      severe="help"
                      icon="pi pi-times"
                      className="!p-1 !w-8"
                      onClick={() => setAddProceduralStage(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
