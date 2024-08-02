import React, { useEffect, useState } from 'react';
import { DialogProps } from 'primereact/dialog';

import FormDialog from './FormDialog';
import TextInput from './TextInput';

type Props = DialogProps & {
  onAccept?: (file: File[]) => void;
}

export default function UploadDocument({ onAccept, onHide, ...props }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  const handleReject = () => {
    setFiles([]);
    onHide();
  };
  const handleAccept = () => {
    onAccept && onAccept(files);
  };

  const handleDeleteFile = (file: File) =>
    () => {
      setFiles(state => state.filter(item => item !== file));
    };

  useEffect(() => {
    if (props.visible) {
      setFiles([]);
    }
  }, [props.visible]);

  return (
    <FormDialog
      {...props}
      style={{ width: '30rem' }}
      onAccept={handleAccept}
      onHide={handleReject}
      onReject={handleReject}
    >
      <TextInput
        id="fileProcesos"
        className="mt-1 block w-full"
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            const [file] = e.target.files;
            setFiles(state => [...state, file]);
          }
        }}
      />
      <div className="flex flex-col gap-4 mt-4">
        {
          files.map(file => (
            <div className="flex justify-between items-center bg-[#8bdefc] p-2 rounded-md shadow-md">
              <span className="truncate">
                {file.name}
              </span>
              <div
                className="bg-white hover:bg-slate-50 active:bg-slate-200 rounded-full py-1 px-2 cursor-pointer"
                onClick={handleDeleteFile(file)}>
                <i className="pi pi-times" />
              </div>
            </div>
          ))
        }
      </div>
    </FormDialog>
  )
}
