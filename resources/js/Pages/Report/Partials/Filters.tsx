import React, { useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import InputLabel from '@/Components/InputLabel';
import { DropdownType } from '@/types';

type Props = {
  className: string;
  clients: DropdownType[];
  proceduresType: DropdownType[];
  status: DropdownType[];
  users: DropdownType[];
  onChange?: (data: any) => void;
  onSearch?: () => void;
}

type Status = {
  clientId?: number;
  procedureTypeId?: number;
  statusId?: number;
  userId?: number;
  workTeamId?: number;
}

export default function Filters({ className, clients, proceduresType, status, users, onChange, onSearch }: Props) {
  const { data, setData, post } = useForm<Status>({
    clientId: undefined, procedureTypeId: undefined, statusId: undefined, userId: undefined, workTeamId: undefined
  });

  const handleSearch = () => {
    onSearch && onSearch();
    router.visit(route('process.report.index'), {
      data: JSON.parse(JSON.stringify(data)),
      preserveState: true
    });
  };

  useEffect(() => {
    onChange && onChange(data);
  }, [data]);

  return (
    <div className={['flex gap-6 items-end', className].join(' ')}>
      <div className="w-full">
        <InputLabel htmlFor="clientId" value="Cliente" />

        <Dropdown
          id="clientId"
          className="mt-1 w-full dropdown"
          options={clients}
          value={data.clientId}
          onChange={e => setData('clientId', e.value)}
          required
          showClear
        />
      </div>
      <div className="w-full">
        <InputLabel htmlFor="procedureTypeId" value="Tipo de procedimiento" />

        <Dropdown
          id="procedureTypeId"
          className="mt-1 w-full dropdown"
          options={proceduresType}
          value={data.procedureTypeId}
          onChange={e => setData('procedureTypeId', e.value)}
          required
          showClear
        />
      </div>
      <div className="w-full">
        <InputLabel htmlFor="statusId" value="Estatus" />

        <Dropdown
          id="statusId"
          className="mt-1 w-full dropdown"
          options={status}
          value={data.statusId}
          onChange={e => setData('statusId', e.value)}
          required
          showClear
        />
      </div>
      <div className="w-full">
        <InputLabel htmlFor="userId" value="Usuarios" />

        <Dropdown
          id="userId"
          className="mt-1 w-full dropdown"
          options={users}
          value={data.userId}
          onChange={e => setData('userId', e.value)}
          required
          showClear
        />
      </div>

      <div>
        <Button
          icon="pi pi-search"
          label="Aplicar Filtro"
          className="w-44 h-9 !text-sm uppercase"
          onClick={handleSearch}
        />
      </div>
    </div>
  )
}