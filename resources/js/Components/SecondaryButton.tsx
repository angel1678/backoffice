import React from 'react';
import { Button as Component, ButtonProps } from 'primereact/button';
import { classNames } from 'primereact/utils';

type Props = ButtonProps & {
  severe?: 'normal' | 'info' | 'help';
}

export default function SecondaryButton({ type = 'button', severe = 'normal', className = '', disabled, children, ...props }: Props) {
  const classNamesSevere = {
    normal: '!bg-secondary-btn !border-secondary-btn',
    info: '!bg-info-btn !border-info-btn',
    help: '!bg-help-btn !border-help-btn',
  }

  return (
    <Component
      {...props}
      type={type}
      className={classNames(classNamesSevere[severe], className)}
      disabled={disabled}
    >
      {children}
    </Component>
  );
}
