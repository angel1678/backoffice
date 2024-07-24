import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { DialogProps } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import FormDialog from '@/Components/FormDialog';
import { Dropdown } from 'primereact/dropdown';

type Props = DialogProps & {
  edit?: boolean;
  formOptions?: { users: any[], roles: string[] };
  model?: any;
}

type Status = {
  userId?: number;
  roles: any;
}

export default function Form({ edit, formOptions, model, onHide, ...props }: Props) {
  const { data, errors, post, put, reset, setData } = useForm<Status>({
    roles: {}
  });

  const handleReject = () => {
    reset();
    onHide();
  };

  const handleAccept = () => {
    const execute = edit ? put : post;
    const routeName = edit ? 'update' : 'store';

    execute(route(`configuration.role.${routeName}`, model?.id), {
      preserveState: true,
      onSuccess: () => handleReject(),
      onError: console.log,
    })
  };

  useEffect(() => {
    console.log(formOptions);
    setData('roles', formOptions?.roles || {});
  }, [formOptions]);

  return (
    <FormDialog
      {...props}
      style={{ width: '30rem' }}
      onAccept={handleAccept}
      onHide={handleReject}
      onReject={handleReject}
    >
      {!edit && (
        <div>
          <InputLabel htmlFor="userId" value="Usuario:" />
          <Dropdown
            className="w-full"
            name="userId"
            options={formOptions?.users}
            value={data.userId}
            onChange={e => setData('userId', e.value)}
          />
          <InputError message={errors.userId} />
        </div>
      )}
      <div>
        <InputLabel htmlFor="roles" value="Roles:" />
        <div>
          <div className="flex justify-between mb-2 border-b-2 border-solid">
            <div>
              <span className="font-bold">Superadministrador</span>
              <ul className="p-1 pb-3">
                <li className="text-sm">- Acceso total</li>
              </ul>
            </div>
            <div>
              <InputSwitch
                checked={data.roles['admin']}
                onChange={e => setData('roles', { ...data.roles, ['admin']: e.value })}
              />
            </div>
          </div>
          <div className="flex justify-between mb-2 border-b-2 border-solid">
            <div>
              <span className="font-bold">Contable</span>
              <ul className="p-1 pb-3">
                <li className="text-sm">- Acceso y edición de administración</li>
                <li className="text-sm">- Ingresos y gastos</li>
              </ul>
            </div>
            <div>
              <InputSwitch
                checked={data.roles['accountant']}
                onChange={e => setData('roles', { ...data.roles, ['accountant']: e.value })}
              />
            </div>
          </div>
          <div className="flex justify-between mb-2 border-b-2 border-solid">
            <div>
              <span className="font-bold">Jefe judicial</span>
              <ul className="p-1 pb-3">
                <li className="text-sm">- Ver lo que se factura por juicio</li>
                <li className="text-sm">- Cambiar estado de activo a pasivo</li>
                <li className="text-sm">- Descargar reporte de facturación y gastos</li>
                <li className="text-sm">- Editar clientes y juicios</li>
                <li className="text-sm">- Modificar y crear plantillas</li>
                <li className="text-sm">- Asignar juicios</li>
              </ul>
            </div>
            <div>
              <InputSwitch
                checked={data.roles['judicialHead']}
                onChange={e => setData('roles', { ...data.roles, ['judicialHead']: e.value })}
              />
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div>
              <span className="font-bold">Asistente Judicial</span>
              <ul className="p-1 pb-3">
                <li className="text-sm">- Cambiar etapas procesales</li>
                <li className="text-sm">- Registrar clientes</li>
                <li className="text-sm">- Registrar procesos</li>
                <li className="text-sm">- Recibir las notificaciones</li>
                <li className="text-sm">- Comentar</li>
                <li className="text-sm">- Elaborar escritos</li>
                <li className="text-sm">- Registrar gastos</li>
                <li className="text-sm">- Cargar documentos</li>
              </ul>
            </div>
            <div>
              <InputSwitch
                checked={data.roles['lawyer']}
                onChange={e => setData('roles', { ...data.roles, ['lawyer']: e.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </FormDialog>
  )
}
