import React from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function useAuth() {
  const { props: { auth: { roles } } } = usePage<PageProps>();

  const hasRol = (rol: string | string[]) => {
    return (typeof rol == 'string')
      ? roles.includes(rol)
      : rol.some(rol => roles.includes(rol));
  };

  const isAdmin = () => hasRol('admin');

  return { hasRol, isAdmin };
}
