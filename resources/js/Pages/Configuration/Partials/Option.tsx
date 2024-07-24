import React from 'react';

type Props = {
  title: string,
  onClick?: () => void,
}

export default function Option({ title, onClick }: Props) {
  return (
    <div
      className="flex justify-between items-center p-5 border-blue-500 border-solid border-spacing-2 border content-center cursor-pointer"
      style={{ width: '25rem', height: '6rem' }}
      onClick={() => onClick && onClick()}
    >
      <div>
        <span>{title}</span>
      </div>
      <div>
        <i className="pi pi-angle-right" style={{ fontSize: '1.25rem' }}></i>
      </div>
    </div>
  )
}
