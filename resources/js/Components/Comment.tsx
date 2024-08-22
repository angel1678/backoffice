import React from 'react';
import { classNames } from 'primereact/utils';

import Icon from './Icon';

type Props = {
  id: string;
  className: string;
  date: string;
  description: string;
  user_name: string;
}

export default function Comment({ id, date, description, user_name, className }: Props) {
  return (
    <div key={id} id={`comment_${id}`} className={classNames('flex gap-4 items-center px-2 py-4', className)}>
      <div>
        <div className="bg-[#808080] p-2 rounded-full">
          <Icon name="perfil" className="h-8" />
        </div>
      </div>
      <div>
        <div className="font-semibold">
          {user_name} - {date}
        </div>
        <span>{description}</span>
      </div>
    </div>
  )
}
