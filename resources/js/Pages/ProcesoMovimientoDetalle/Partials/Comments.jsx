import { useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import { Mention } from 'primereact/mention';
import Icon from '@/Components/Icon';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import useNotification from '@/Hook/useNotification';

export default function Comments({ procesoId, detalleId, comentarios = [] }) {
  const [suggestions, setSuggestions] = useState([]);
  const { data, setData, post, reset, processing, transform, errors } = useForm({ comment: '' });

  transform(data => {
    const regex = new RegExp(/@[A-z10-9]*/, 'gi');
    const nicksName = [...data.comment.matchAll(regex)].map(_ => _[0]);
    return { ...data, nicksName };
  });

  const handleSearch = async (e) => {
    const { data } = await axios.get(route('proceso.user.index', procesoId), {
      params: { search: e.query }
    });
    setSuggestions(data.associates)
  };

  const itemTemplate = (suggestion) => {
    return (
      <div className="flex items-center">
        <span className="flex flex-col ml-2">
          {suggestion.name}
          <small style={{ fontSize: '.75rem', color: 'var(--text-secondary-color)' }}>@{suggestion.nickname}</small>
        </span>
      </div>
    );
  };

  const handleClick = () => {
    post(route('proceso.detalle.comentario.store', detalleId), {
      preserveState: true,
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <div className="mt-6">
      <div>
        {
          comentarios.map(item => {
            return (
              <div key={item.id} id={`comment_${item.id}`} className="flex gap-4 items-center px-2 py-4 border-t-2">
                <div>
                  <div className="bg-[#808080] p-2 rounded-full">
                    <Icon name="perfil" className="h-8" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold">
                    {item.user_name} - {item.date}
                  </div>
                  <span>{item.description}</span>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="flex items-center gap-2 border-t-2 pt-2">
        <div className="w-full">
          <Mention
            value={data.comment}
            onChange={e => setData('comment', e.target.value)}
            field="nickname"
            suggestions={suggestions}
            onSearch={handleSearch}
            placeholder="Agregar un comentario ..."
            rows={2}
            className="w-full mt-1"
            inputClassName="w-full !border-none text-sm !p-1.5"
            itemTemplate={itemTemplate}
          />
          <InputError message={errors.comment} />
          <InputError message={errors.nicksName} />
        </div>
        <PrimaryButton icon="pi pi-send" disabled={processing} onClick={handleClick} />
      </div>
    </div>
  );
}
