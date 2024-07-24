import React from 'react';
import { Dialog, DialogProps } from 'primereact/dialog';
import { Button } from 'primereact/button';

type Props = DialogProps & {
  onAccept?: () => void;
  onReject?: () => void;
}

export default function FormDialog({ children, onAccept, onReject, ...props }: Props) {
  const footerTemplate = (
    <>
      <Button
        label="Cancelar"
        severity="danger"
        text
        onClick={() => onReject && onReject()}
      />
      <Button
        label="Aceptar"
        severity="success"
        onClick={() => onAccept && onAccept()}
      />
    </>
  );

  return (
    <Dialog {...props} footer={footerTemplate}>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </Dialog>
  )
}
