import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogProps } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

import Comment from '@/Components/Comment';
import PrimaryButton from '@/Components/PrimaryButton';

type Props = DialogProps & {
  judicialId: string;
  models?: any[];
}

type State = {
  type?: string;
  comment?: string;
}

export default function GeneralComments({ judicialId, models = [], ...props }: Props) {
  const { data, post, processing, setData, reset } = useForm<State>({ type: 'process' });
  const [comments, setComments] = useState<any[]>();

  const handleSubmit = () => {
    post(route('judicial.comment.store', judicialId), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: ({ props }) => {
        reset();
      }
    })
  };

  useEffect(() => {
    if (models?.length > 0)
      setComments(models);
  }, [models]);

  return (
    <Dialog
      {...props}
      style={{ width: '35vw', height: 'calc(100vh - 10rem)' }}
    >
      <div style={{ height: 'calc(100vh - 25rem)', overflowY: 'auto' }}>
        {
          comments?.map(item => (<Comment {...item} className="border-2 rounded-md mb-2 shadow-md" />))
        }
      </div>
      <div className="flex flex-col items-center gap-2 pt-2">
        <div className="w-full">
          <InputTextarea
            className="w-full mt-1"
            placeholder="Agregar observación"
            rows={2}
            value={data.comment}
            onChange={e => setData('comment', e.target.value)}
          />
        </div>
        <PrimaryButton
          label="Guardar"
          className="w-1/4"
          disabled={processing}
          onClick={handleSubmit}
        />
      </div>
    </Dialog>
  )
}
