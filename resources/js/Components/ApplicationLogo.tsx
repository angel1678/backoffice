import React from 'react';

type Props = {
  className: string
  isDark?: boolean;
}

export default function ApplicationLogo({ className, isDark }: Props) {
  return (
    <img src={`/img/logo${isDark ? '-black' : ''}.png`} className={className} />
  );
}
