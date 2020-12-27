import { useState } from 'react';

export const useContxtMenu = ({rightClickHandler}) => {
  const contextMenuInitialState = { x: null, y: null };
  const [position, setPosition] = useState(contextMenuInitialState);

  const onRightClick = (event, obj) => {
    event.preventDefault();
    setPosition({
      x: event.clientX - 2,
      y: event.clientY - 4,
    });

    if(rightClickHandler) rightClickHandler(event, obj);
  };

  const contextMenuClose = () => {
    setPosition(contextMenuInitialState);
  };


  return { position, onRightClick, contextMenuClose }
}