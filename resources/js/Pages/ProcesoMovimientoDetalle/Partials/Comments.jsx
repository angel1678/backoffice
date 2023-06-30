import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import { Mention } from 'primereact/mention';

export default function Comments({procesoId, comentarios = []}) {
  const [suggestions, setSuggestions] = useState([]);
  const { data, setData, post, reset, processing } = useForm({ comment: "" });

  const handleSearch = async (e) => {
    const search = e.query;
    const { data } = await axios.get(route('proceso.user.index', procesoId), {
      params: {search}
    });

    setSuggestions(data.associates);
  };

  const itemTemplate = (suggestion) => {
    return (
        <div className="flex align-items-center">
            <span className="flex flex-column ml-2">
                {suggestion.name}
                {/* <small style={{ fontSize: '.75rem', color: 'var(--text-secondary-color)' }}>@{suggestion.email}</small> */}
            </span>
        </div>
    );
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <div className="text-sm ml-1.5">
        {
          comentarios.map(i => (
            <span>{i}</span>
          ))
        }
      </div>
      <div className="mt-3 mr-12">
        <Mention
          value={data.comment}
          onChange={e => setData('comment', e.target.value)}
          suggestions={suggestions}
          onSelect={e => console.log(e.suggestion)}
          onSearch={handleSearch}
          field="name"
          rows={1}
          className="w-full"
          inputClassName="w-full !p-1.5"
          itemTemplate={itemTemplate}
        />
      </div>
    </div>
  );
}
