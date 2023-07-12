import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import { Mention } from 'primereact/mention';
import { Button } from 'primereact/button';

export default function Comments({procesoId, detalleId, comentarios = []}) {
  const [suggestions, setSuggestions] = useState([]);
  const { data, setData, post, reset, processing } = useForm({ comment: '' });

  const handleSearch = async (e) => {
    const search = e.query;
    const { data } = await axios.get(route('proceso.user.index', procesoId), {
      params: {search}
    });

    setSuggestions(data.associates);
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
    <div className="mt-6 border rounded-md p-2">
      <div className="w-full border-b">Comentarios</div>
      <div className="text-sm my-3 mr-12">
        {
          comentarios.map(item => (
            <div key={item.id} className="flex gap-4 items-center mb-1 p-2">
              <div>
                <i className="pi pi-user text-2xl" />
              </div>
              <div>
                <div>
                  <span className="font-bold">{item.user_name}</span> - {item.date}
                </div>
                <span>{item.description}</span>
              </div>
            </div>
          ))
        }
      </div>
      <div className="flex items-center gap-2">
        <Mention
          value={data.comment}
          onChange={e => setData('comment', e.target.value)}
          field="nickname"
          suggestions={suggestions}
          onSearch={handleSearch}
          placeholder="Agregar un comentario ..."
          rows={2}
          className="w-full"
          inputClassName="w-full text-sm !p-1.5"
          itemTemplate={itemTemplate}
        />
        <Button icon="pi pi-send" className="!h-9" disabled={processing} onClick={handleClick} />
      </div>
    </div>
  );
}
