import Icon from '@/Components/Icon';
import React from 'react';

type Props = {
  title: string;
  icon?: string;
  onClick?: () => void;
}

export default function Option({ title, icon, onClick }: Props) {
  return (
    <div
      className="flex justify-between items-center p-5 border-blue-500 border-solid border-spacing-2 border content-center cursor-pointer"
      style={{ width: '25rem', height: '6rem' }}
      onClick={() => onClick && onClick()}
    >
      <div className="flex gap-3 items-center">
        {icon && (
          <Icon name={icon} className="h-10" />
        )}
        <span>{title}</span>
      </div>
      <div>
        <i className="pi pi-angle-right" style={{ fontSize: '1.25rem' }}></i>
      </div>
    </div>
  )
}
