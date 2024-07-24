import React from 'react';
import { Button as Component, ButtonProps } from 'primereact/button';
import { classNames } from 'primereact/utils';

export default function PrimaryButton({ className = '', disabled, children, ...props }: ButtonProps) {
  return (
    <Component
      {...props}
      className={classNames('!bg-primary-btn !border-primary-btn', className)}
      disabled={disabled}
    >
      {children}
    </Component>
  );
}
