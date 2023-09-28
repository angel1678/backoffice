import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ name, icon, className, isDark = false }) {
  if (name) {
    return (
      <img src={`/img/${name}${isDark ? '-black' : ''}.svg`} className={className} />
    )
  }

  if (icon) {
    return (
      <div className={['h-6', className].join(' ')}>
        <icon />
      </div>
    )
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  isDark: PropTypes.bool,
}
