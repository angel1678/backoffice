import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';


export default function BackButton({ label, icon, onClick }) {
  return (
    <Button
      label={label}
      icon={icon}
      style={{ backgroundColor: '#DBECFE', borderColor: '#1F57D6', color: '#1F57D6' }}
      onClick={onClick}
    />
  )
}

BackButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
}

BackButton.defaultProps = {
  label: 'Regresar',
  icon: 'pi pi-chevron-left'
}
