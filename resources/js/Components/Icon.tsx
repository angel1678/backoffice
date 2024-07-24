import React from 'react';

type Props = {
  className?: string;
  name?: string;
  isDark?: boolean;
}

export default function Icon({ name, className, isDark = false }: Props) {
  if (name) {
    return (
      <img src={`/img/${name}${isDark ? '-black' : ''}.svg`} className={className} />
    )
  }
}
