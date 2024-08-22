import React, { useEffect, useRef, useState } from 'react';
import { DialogProps } from 'primereact/dialog';

import FormDialog from './FormDialog';
import TextInput from './TextInput';
import PrimaryButton from './PrimaryButton';

type Props = DialogProps & {
  onAccept?: (file: File[]) => void;
}

export default function UploadDocument({ onAccept, onHide, ...props }: Props) {
  const inputFile = useRef<HTMLInputElement | null>(null);
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
      <div>
        <TextInput
          id="fileProcesos"
          ref={inputFile}
          style={{ 'display': 'none' }}
          accept=".docx, .pdf"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              const [file] = e.target.files;
              setFiles(state => [...state, file]);
            }
          }}
        />
        <PrimaryButton
          className="w-full"
          label="Cargar documento"
          onClick={() => inputFile.current?.click()}
        />
      </div>
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
