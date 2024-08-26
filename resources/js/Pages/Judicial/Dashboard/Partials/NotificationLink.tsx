import React from 'react';
import { Link } from '@inertiajs/react';
import { classNames } from 'primereact/utils';
import Icon from '@/Components/Icon';

type Props = {
  routeName: string;
  title: string;
  type: string;
  value: string;
  icon?: string;
  classNameIcon?: string;
}

export default function NotificationLink({ icon, routeName, title, type, value, classNameIcon }: Props) {
  return (
    <Link
      href={route(routeName)}
      method="get"
      as="button"
      data={{ notification: type }}
      className={classNames('flex items-center text-lg w-64', { 'font-bold': type == value })}
    >
      <Icon name={icon} className={classNames('mr-3 h-6', classNameIcon)} />
      <span>{title}</span>
    </Link>
  )
}
