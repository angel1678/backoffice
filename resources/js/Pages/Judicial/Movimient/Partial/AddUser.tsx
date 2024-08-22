import React from 'react';
import { router, useForm } from '@inertiajs/react';

import { Button } from 'primereact/button';
import { Dialog, DialogProps } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

type Props = DialogProps & {
  associates?: any[];
  procesoId: number;
  ownerId: any;
  users: any[];
};

export default function AddUser({ associates = [], procesoId, ownerId, users, visible, onHide }: Props) {
  const { data, setData, errors, post, reset, processing } = useForm({ userId: 0 });

  const handleSave = () => {
    post(route('proceso.user.store', procesoId), {
      preserveState: true,
      onSuccess: () => reset()
    });
  };

  const handleDelete = (userId: number) => {
    router.delete(route('proceso.user.destroy', [procesoId, userId]), {
      preserveState: true,
    });
  }

  const footer = (
    <div>
      <Button label="Guardar" icon="pi pi-check" disabled={processing} onClick={handleSave} autoFocus />
    </div>
  );

  return (
    <Dialog
      header="Agregar Usuario"
      style={{ width: '30vw' }}
      visible={visible}
      footer={footer}
      onHide={onHide}
    >
      <form>
        <div className="w-full mb-3">
          <InputLabel htmlFor="userId" value="Seleccione un usuario" />

          <Dropdown
            name="userId"
            className="mt-1 w-full h-10 text-sm custom-dropdown"
            options={users}
            filter
            value={data.userId}
            onChange={e => setData('userId', e.value)}
          />

          <InputError message={errors.userId} />
        </div>
      </form>

      {
        associates.length > 0 &&
        <div className="w-full mb-3 mt-8">
          <InputLabel value="Usuarios asociados" />
          <div className="border rounded-md mt-1 p-2">
            {
              associates.map(user => (
                <div key={user.id} className="shadow rounded-md py-2 px-3 my-2 flex justify-between items-center">
                  <span>{user.name}</span>
                  {
                    ownerId != user.id &&
                    <Button icon="pi pi-trash" severity="danger" text onClick={() => handleDelete(user.id)} />
                  }
                </div>
              ))
            }
          </div>
        </div>
      }
    </Dialog>
  );
}
