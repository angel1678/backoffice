import React from 'react';
import { Link } from '@inertiajs/react';
import { classNames } from 'primereact/utils';

type Props = {
  routeName: string;
  title: string;
  type: string;
  value: string;
}

export default function NotificationLink({ routeName, title, type, value }: Props) {
  return (
    <Link
      href={route(routeName)}
      method="post"
      as="button"
      data={{ notification: type }}
      className={classNames('text-lg w-64', { 'font-bold': type == value })}
    >
      <span>{title}</span>
    </Link>
  )
}
