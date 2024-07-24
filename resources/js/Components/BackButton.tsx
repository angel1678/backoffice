import React from 'react';
import { Button as Component } from 'primereact/button';

type Props = {
  disabled?: boolean;
  label?: string;
  icon?: string;
  onClick?: () => void;
}

export default function BackButton({ disabled, label = 'Regresar', icon = 'pi pi-chevron-left', onClick }: Props) {
  return (
    <Component
      disabled={disabled}
      icon={icon}
      label={label}
      style={{ backgroundColor: '#DBECFE', borderColor: '#1F57D6', color: '#1F57D6' }}
      onClick={onClick}
    />
  )
}
