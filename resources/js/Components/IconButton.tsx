import React from 'react';

type Props = {
  icon: string;
  onClick?: () => void;
}

export default function IconButton({ icon, onClick }: Props) {
  return (
    <div className="bg-secondary-btn h-8 w-8 text-white text-sm rounded-md flex justify-center items-center cursor-pointer" onClick={onClick}>
      <i className={icon} />
    </div>
  )
}
