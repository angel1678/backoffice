import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import InputLabel from '@/Components/InputLabel';

export default function Filters({ className }) {
  const { data, setData, post } = useForm({
    subjectId: undefined, clientId: undefined, competentAuthorityId: undefined, userId: undefined, workTeamId: undefined
  });

  return (
    <div className={['flex gap-6 items-end', className].join(' ')}>
      <div className="w-full">
        <InputLabel htmlFor="subjectId" value="Materia" />

        <Dropdown
          id="subjectId"
          className="mt-1 w-full dropdown"
          options={[]}
          value={data.subjectId}
          onChange={e => setData('subjectId', e.value)}
          required
        />
      </div>
      <div className="w-full">
        <InputLabel htmlFor="clientId" value="Cliente" />

        <Dropdown
          id="clientId"
          className="mt-1 w-full dropdown"
          options={[]}
          value={data.clientId}
          onChange={e => setData('clientId', e.value)}
          required
        />
      </div>
      <div className="w-full">
        <InputLabel htmlFor="competentAuthorityId" value="Autoridad Competente" />

        <Dropdown
          id="competentAuthorityId"
          className="mt-1 w-full dropdown"
          options={[]}
          value={data.competentAuthorityId}
          onChange={e => setData('competentAuthorityId', e.value)}
          required
        />
      </div>
      <div className="w-full">
        <InputLabel htmlFor="userId" value="Usuarios" />

        <Dropdown
          id="userId"
          className="mt-1 w-full dropdown"
          options={[]}
          value={data.userId}
          onChange={e => setData('userId', e.value)}
          required
        />
      </div>
      <div className="w-full">
        <InputLabel htmlFor="workTeamId" value="Equipo de Trabajo" />

        <Dropdown
          id="workTeamId"
          className="mt-1 w-full dropdown"
          options={[]}
          value={data.workTeamId}
          onChange={e => setData('workTeamId', e.value)}
          required
        />
      </div>

      <div>
        <Button icon="pi pi-search" label="Aplicar Filtro" className="w-40 h-9 !text-sm uppercase" />
      </div>
    </div>
  )
}
