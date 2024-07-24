import React from 'react';

type Props = {
  className: string
}

export default function ApplicationLogo({ className }: Props) {
  return (
    <img src="/img/logo.png" className={className} />
  );
}
