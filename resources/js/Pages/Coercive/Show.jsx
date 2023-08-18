import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { ScrollPanel } from 'primereact/scrollpanel';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout2';
import CreateContact from './Partials/CreateContact';
import DeleteContact from './Partials/DeleteContact';
import { useEffect } from 'react';
import InputError from '@/Components/InputError';

export default function Show({ auth, account, contacts, ...props }) {
  const [options, setOptions] = useState({ types: [], locations: [], stages: [] });
  const [contactId, setContactId] = useState(undefined);
  const { data, setData, errors, put, progress } = useForm({ stageId: account.stage_id });

  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);

  const handleShowAddContact = () => {
    router.get(route('coercive.accounts.contacts.create', account.id), {}, {
      preserveState: true,
      onSuccess: ({ props: { options } }) => {
        let _locations = options.locations;
        _locations = _locations?.filter(item => item.parent_id === 1)
          .map(item => ({
            ...item,
            key: item.value,
            children: _locations?.filter(itemSon => itemSon.parent_id === item.value)
              .map(item => ({ ...item, key: item.value }))
          }))
        setOptions({ ...options, locations: _locations });
        setVisibleAddDialog(true);
      },
    });
  };

  const handleShowDeleteContact = (contactId) => {
    setContactId(contactId);
    setVisibleDeleteDialog(true);
  };

  const handleSubmit = () => {
    put(route('coercive.accounts.update', account.id));
  };

  const bodyData = ({ type_id, data }) =>
    [5, 6].includes(type_id) ? `${data.location} / ${data.value}` : data.value;

  const bodyAcciones = (data) => (
    <div className="flex gap-1 justify-center m-1">
      <Button icon="fas fa-trash fa-md" severity="danger" text className="h-8" onClick={() => handleShowDeleteContact(data.id)} />
    </div>
  );

  useEffect(() => {
    setOptions(props.options);
  }, []);

  return (
    <AuthenticatedLayout
      auth={auth}
      title="Procesos Judiciales"
      errors={errors}
    >
      <CreateContact
        accountId={account.id}
        locations={options.locations}
        types={options?.types}
        visible={visibleAddDialog}
        onHide={() => setVisibleAddDialog(false)}
      />

      <DeleteContact
        accountId={account.id}
        contactId={contactId}
        visible={visibleDeleteDialog}
        onHide={() => setVisibleDeleteDialog(false)}
      />

      <div className="flex m-2">
        <div className="bg-white rounded-md mr-1 w-1/2">
          <div className="font-bold text-lg border-b px-3 py-2">
            Cuenta - Información
          </div>
          <ScrollPanel style={{ width: '100%', height: 'calc(100vh - 6.8rem)' }} >
            <div className="grid p-3">
              <div className="flex flex-col mb-3">
                <div className="font-semibold text-base">Proceso</div>
                <div>{account.process}</div>
              </div>
              <div className="flex flex-col mb-3">
                <div className="font-semibold text-base">Identificación</div>
                <div>{account.identification}</div>
              </div>
              <div className="flex flex-col mb-3">
                <div className="font-semibold text-base">Nombre</div>
                <div>{account.name}</div>
              </div>
              <div className="flex flex-col mb-3">
                <div className="font-semibold text-base">Etapa</div>

                <div className="w-1/2">
                  <Dropdown
                    id="stage_id"
                    className="dropdown mt-1 w-full"
                    placeholder={account.stage}
                    options={options.stages}
                    value={data.stageId}
                    onChange={(e) => setData('stageId', e.value)}
                  />
                </div>

                <InputError message={errors.stageId} />
              </div>
              <div className="flex flex-col mb-3">
                <div className="font-semibold text-base">Capital</div>
                <div>{account.principal_amount}</div>
              </div>
            </div>
            <div>
              <Button
                className="text-xs h-9 button uppercase"
                label="Guardar"
                icon="pi pi-save"
                iconPos="right"
                disabled={!data.stageId || progress}
                onClick={handleSubmit}
              />
            </div>
          </ScrollPanel>
        </div>

        <div className="bg-white rounded-md w-1/2">
          <div className="font-bold text-lg border-b px-3 py-2">
            Contactos
          </div>
          <div className="mt-2">
            <div className="flex justify-end">
              <Button icon="pi pi-plus" className="text-xs h-9 button uppercase" onClick={handleShowAddContact} />
            </div>
            <DataTable
              value={contacts}
              showGridlines
              emptyMessage="No existen registros."
              size="small"
              className="mt-2"
            >
              <Column field="type_name" header="Tipo" headerClassName="!py-1 !px-2" />
              <Column body={bodyData} header="Dato" headerClassName="!py-1 !px-2" />
              <Column field="observation" header="Observacion" headerClassName="!py-1 !px-2" />
              <Column body={bodyAcciones} header="Acciones" headerClassName="!py-1 !px-2" style={{ width: '5rem' }} />
            </DataTable>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
