import React from 'react';

import Icon from './Icon';

export type ItemProps = {
  icon: string;
  label: string;
}

type Props = {
  className?: string;
  items?: ItemProps[];
}

export default function BreadCrumb({ className, items }: Props) {
  return (
    <div className={['flex', className].join(' ')}>
      {
        items?.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && <i className="pi pi-angle-right" />}
            {item.icon && <Icon name={item.icon} isDark className="h-6 mr-2" />}
            <span className="text-2xl font-bold">{item.label}</span>
          </div>
        ))
      }
    </div>
  )
}
