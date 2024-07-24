import React from 'react';
import { Link } from '@inertiajs/react';

type Props = {
  className?: string;
  image: string;
  imageAlt: string;
  linkName: string;
  linkHref: string;
}

export default function ImageButton({ image, imageAlt, linkName, linkHref, ...props }: Props) {
  const className = [
    'flex flex-col justify-between items-center w-52 h-52 rounded-lg bg-gray-200 p-5',
    props.className,
  ].join(' ');

  return (
    <div className={className}>
      <div className="h-full flex items-center">
        <img src={image} className="w-28 h-28" alt={imageAlt} />
      </div>

      <Link href={linkHref} className="text-xl text-blue-700">{linkName}</Link>
    </div>
  )
}
