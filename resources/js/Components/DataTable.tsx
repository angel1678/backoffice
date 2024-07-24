import React, { ReactNode } from 'react';
import { DataTable as Component, DataTableProps } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';

type Props = DataTableProps<any> & {
  title?: string;
  buttons?: (data: any) => ReactNode;

  hiddenButtons?: boolean;
  hiddenHeader?: boolean;

  onAdd?: () => void;
  onEdit?: (data: any) => void;
  onDelete?: (data: any) => void;
}

export default function DataTable({ children, hiddenButtons, hiddenHeader, scrollHeight, title, onAdd, onEdit, onDelete, ...props }: Props) {

  const handleAdd = () => onAdd && onAdd();
  const handleEdit = (data: any) => onEdit && onEdit(data);
  const handleDelete = (data: any) => onDelete && onDelete(data);

  const buttons = (data: any) => (
    <div className="flex gap-1">
      {props?.buttons && props?.buttons(data)}
      <Button icon="pi pi-pencil" severity="success" onClick={() => handleEdit(data)} />
      <Button icon="pi pi-trash" severity="secondary" onClick={() => handleDelete(data)} />
    </div>
  );

  return (
    <>
      {hiddenHeader && (
        <div className="flex justify-between">
          <label className="font-bold text-2xl">{title}</label>
          <div>
            {!hiddenButtons &&
              <Button label="Agregar nuevo" icon="pi pi-plus" onClick={handleAdd} />
            }
          </div>
        </div>
      )}
      <div className="bg-white overflow-hidden shadow-md rounded-xl mt-4 py-4 px-4">
        <Component
          {...props}
          scrollHeight={scrollHeight}
          scrollable
          className="datatable-page"
        >
          {children}
          {!hiddenButtons &&
            <Column body={buttons} style={{ width: '6rem' }} />
          }
        </Component>
      </div>
    </>
  )
}
