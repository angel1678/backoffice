import React, { useState } from 'react';

export default function useDialog() {
  const [visible, setVisible] = useState<boolean>(false);

  const handleShow = () => setVisible(true);
  const handleHide = () => setVisible(false);
  const handleToggle = () => setVisible(state => !state);

  return { visible, handleHide, handleShow, handleToggle };
}
