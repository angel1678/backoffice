import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Dialog, DialogProps } from 'primereact/dialog';

import SecondaryButton from './SecondaryButton';

type Props = DialogProps & {
  documents: any[];
}

export default function ShowDocument({ documents, onHide, ...props }: Props) {
  const [document, setDocument] = useState<string | undefined>();

  const handleShowDocument = (item: any) => {
    router.get(route('judicial.document.show', item.id), {}, {
      preserveState: true,
      onSuccess: ({ props }) => {
        const { documentSelected } = props as any;
        setDocument(documentSelected);
        console.log(documentSelected)
      },
    })
  };

  const handleHide = () => {
    onHide();
    setDocument(undefined);
  };

  return (
    <Dialog
      {...props}
      style={{ width: '70%', height: 'calc(100vh - 10rem)' }}
      onHide={handleHide}
    >
      <div className="flex flex-row h-full">
        <div className="w-1/3 flex flex-col gap-3">
          {documents?.map(item => (
            <SecondaryButton key={item.id} label={item.name} onClick={() => handleShowDocument(item)} />
          ))}
        </div>
        <div className="w-2/3 border-l-2 ml-4">
          {document
            ? (<object data={document} type="application/pdf" className="w-full h-full" />)
            : (
              <div className="flex w-full h-full justify-center items-center">
                <span>Debe seleccionar un archivo para visualizarlo.</span>
              </div>
            )}
        </div>
      </div>
    </Dialog>
  )
}
