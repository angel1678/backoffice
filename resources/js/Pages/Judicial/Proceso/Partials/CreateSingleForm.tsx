import React, { useEffect, useState } from 'react';
import { Errors } from '@inertiajs/core';
import { router, useForm } from '@inertiajs/react';

import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';

import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import UploadDocument from '@/Components/UploadDocument';
import useDialog from '@/Hook/useDialog';
import { DropdownType, InvolvedType } from '@/types';

import CreateInvolvedForm from './CreateInvolvedForm';
import Icon from '@/Components/Icon';

type Props = {
  actors?: DropdownType[];
  className?: string;
  clients?: DropdownType[];
  clientSelected?: number;
  defaultUserId: number;
  defendants?: DropdownType[];
  personWhoPays?: DropdownType[];
  proceduresType?: DropdownType[];
  relevantInformation?: DropdownType[];
  users: DropdownType[];
  onErrors: (errors: Errors) => void;
}

type State = {
  process?: any;
  clientId?: number;
  actors?: string[];
  defendants?: string[];
  personWhoPays?: number;
  identification?: string;
  numberOperation?: string;
  amount?: number | null;
  relevantInformation?: number;
  typeProcedure?: number;
  proceduralStage?: number;
  responsible?: number;
  files?: File[];
}

const CreateSingleForm = ({ className, clients, clientSelected, defaultUserId, personWhoPays, proceduresType, relevantInformation, users, onErrors }: Props) => {
  const { visible: visibleUpload, handleHide: handleHideUpload, handleShow: handleShowUpload } = useDialog();
  const { visible: visibleActor, handleHide: handleHideActor, handleShow: handleShowActor } = useDialog();
  const [clientDisabled, setClientDisabled] = useState<boolean>(false);
  const { data, setData, errors, post, reset, processing } = useForm<State>({
    process: '', responsible: defaultUserId, clientId: clientSelected, identification: '', numberOperation: ''
  });

  const [involvedType, setInvolvedType] = useState<InvolvedType>();
  const [defendantsType, setDefendantsType] = useState<any[]>();
  const [proceduralStage, setProceduralStage] = useState<DropdownType[]>();
  const [actors, setActors] = useState<any[]>([]);
  const [defendants, setDefendants] = useState<any[]>([]);

  const handleTypeOfProcedure = (e: DropdownChangeEvent) => {
    router.get(route('configuration.proceduralStage.show', { procedureType: e.value }), {}, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: ({ props }) => {
        const { proceduralStage } = props as any;
        setProceduralStage(proceduralStage);
        setData(state => ({ ...state, typeProcedure: e.value, proceduralStage: undefined }));
      },
      onError: console.log,
    });
  };

  const handleSubmit = () => {
    post(route('judicial.process.store'), {
      preserveScroll: true,
      preserveState: true,
      onError: (errors) => onErrors && onErrors(errors)
    });
  };

  const handleAcceptUpload = (files: File[]) => {
    setData('files', files);
    handleHideUpload();
  };

  const handleAddInvolved = (type: InvolvedType) =>
    () => {
      setInvolvedType(type);
      router.get(route('judicial.involved.create'), { type }, {
        preserveState: true,
        onSuccess: ({ props }) => {
          const { defendantsType } = props as any;
          setDefendantsType(defendantsType);
          handleShowActor();
        }
      });
    };

  const dropdownFooterTemplate = (onClick: () => void) =>
    () => (
      <div className="p-2">
        <SecondaryButton label="Agregar" icon="pi pi-plus" className="w-full h-9" onClick={onClick} />
      </div>
    );

  useEffect(() => {
    if (clientSelected) {
      setClientDisabled(true);
      setData('clientId', clientSelected);
    }
  }, [clientSelected]);

  return (
    <>
      <UploadDocument
        header="Subir documentos"
        visible={visibleUpload}
        onAccept={handleAcceptUpload}
        onHide={handleHideUpload}
      />

      <CreateInvolvedForm
        defendantsType={defendantsType}
        header={involvedType == 'actor' ? "Agregar Actor" : "Agregar demandado"}
        type={involvedType}
        visible={visibleActor}
        onHide={handleHideActor}
        onSave={(data) => {
          if (involvedType == 'actor') {
            const _actors = [...actors, data];
            setActors(_actors);
            setData('actors', _actors);
          } else if (involvedType == 'defendant') {
            const _defendants = [...defendants, data];
            setDefendants(_defendants);
            setData('defendants', _defendants);
          }
          handleHideActor()
        }}
      />

      <section className={className}>
        <header className="flex justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">Registro de proceso simple</h2>
          <div className="flex gap-2">
            <PrimaryButton label="Cargar documentos" icon={<Icon name="cargar-documentos" className="h-6 mr-1" />} onClick={handleShowUpload} />
            <PrimaryButton label="Registrar" icon={<Icon name="registrar" className="h-6 mr-1" />} onClick={handleSubmit} disabled={processing} />
          </div>
        </header>

        <form className="mt-6 space-y-6">
          <div className="flex gap-2">
            <div className="w-1/4">
              <InputLabel htmlFor="process" value="Número de proceso" />

              <InputMask
                className="mt-1 block w-full"
                id="process"
                mask="99999-9999-99999"
                placeholder="99999-9999-99999"
                required
                value={data.process}
                onChange={e => setData('process', e.value)}
              />

              <InputError message={errors.process} className="mt-2" />
            </div>

            <div className="w-1/4">
              <InputLabel htmlFor="clientId" value="Cliente" />

              <Dropdown
                id="clientId"
                className="mt-1 w-full"
                disabled={clientDisabled}
                options={clients}
                required
                value={data.clientId}
                onChange={(e) => setData('clientId', e.value)}
              />

              <InputError message={errors.clientId} className="mt-2" />
            </div>

            <div className="w-1/4">
              <InputLabel htmlFor="actors" value="Actor" />

              <MultiSelect
                id="actors"
                className="mt-1 w-full"
                options={actors}
                optionLabel="name"
                required
                value={data.actors}
                onChange={(e) => setData('actors', e.value)}
                panelFooterTemplate={dropdownFooterTemplate(handleAddInvolved('actor'))}
              />

              <InputError message={errors.actors} className="mt-2" />
            </div>

            <div className="w-1/4">
              <InputLabel htmlFor="defendants" value="Demandado" />

              <MultiSelect
                id="defendants"
                className="mt-1 w-full"
                options={defendants}
                optionLabel="name"
                required
                value={data.defendants}
                onChange={(e) => setData('defendants', e.value)}
                panelFooterTemplate={dropdownFooterTemplate(handleAddInvolved('defendant'))}
              />

              <InputError message={errors.defendants} className="mt-2" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/4">
              <InputLabel htmlFor="personWhoPays" value="Persona a quien se le factura" />

              <Dropdown
                className="mt-1 w-full"
                id="personWhoPays"
                options={personWhoPays}
                value={data.personWhoPays}
                onChange={e => setData('personWhoPays', e.value)}
                required
              />

              <InputError message={errors.personWhoPays} className="mt-2" />
            </div>

            <div className="w-1/4">
              <InputLabel htmlFor="identification" value="Cédula del demandado" />

              <InputText
                className="mt-1 block w-full"
                id="identification"
                value={data.identification}
                onChange={e => setData('identification', e.target.value)}
                maxLength={10}
                keyfilter="pint"
                required
              />

              <InputError message={errors.identification} className="mt-2" />
            </div>
            <div className="w-1/4">
              <InputLabel htmlFor="numberOperation" value="Número de operación" />

              <InputText
                className="mt-1 block w-full"
                id="numberOperation"
                value={data.numberOperation}
                onChange={e => setData('numberOperation', e.target.value)}
                maxLength={12}
                keyfilter="pint"
                required
              />

              <InputError message={errors.numberOperation} className="mt-2" />
            </div>
            <div className="w-1/4">
              <InputLabel htmlFor="amount" value="Cuantia" />

              <InputNumber
                className="mt-1 block"
                inputClassName="w-full"
                id="amount"
                value={data.amount}
                onChange={(e: any) => {
                  console.log(e);
                  setData('amount', e.value)
                }}
                required
                max={9999999999}
                mode="decimal"
                prefix="$ "
                locale="de-DE"
                minFractionDigits={2}
              />

              <InputError message={errors.amount} className="mt-2" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/4">
              <InputLabel htmlFor="relevantInformation" value="Información relevante para facturación" />

              <Dropdown
                className="mt-1 w-full"
                id="relevantInformation"
                options={relevantInformation}
                value={data.relevantInformation}
                onChange={e => setData('relevantInformation', e.value)}
                required
              />

              <InputError message={errors.relevantInformation} className="mt-2" />
            </div>
            <div className="w-1/4">
              <InputLabel htmlFor="typeOfProcedure" value="Tipo de procedimiento" />

              <Dropdown
                className="mt-1 w-full"
                id="typeOfProcedure"
                options={proceduresType}
                value={data.typeProcedure}
                onChange={handleTypeOfProcedure}
                required
              />

              <InputError message={errors.typeProcedure} className="mt-2" />
            </div>
            <div className="w-1/4">
              <InputLabel htmlFor="proceduralStage" value="Etapa procesal" />

              <Dropdown
                className="mt-1 w-full"
                id="proceduralStage"
                options={proceduralStage}
                value={data.proceduralStage}
                onChange={e => setData('proceduralStage', e.value)}
                required
              />

              <InputError message={errors.proceduralStage} className="mt-2" />
            </div>
            <div className="w-1/4">
              <InputLabel htmlFor="responsible" value="Responsable del juicio" />

              <Dropdown
                className="mt-1 w-full"
                id="responsible"
                options={users}
                value={data.responsible}
                onChange={e => setData('responsible', e.value)}
                required
              />

              <InputError message={errors.responsible} className="mt-2" />
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreateSingleForm;
