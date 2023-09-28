import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

export default function BreadCrumb({ className, items }) {
  return (
    <div className={['flex', className].join(' ')}>
      {
        items.map((item, index) => (
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

BreadCrumb.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
}
