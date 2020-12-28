import { useState } from 'react';

export const useContextMenu = () => {
  const contextMenuInitialState = { x: null, y: null };
  const [position, setPosition] = useState(contextMenuInitialState);

  console.log(position)

  const onRightClick = (event, obj) => {
    event.preventDefault();
    setPosition({
      x: event.clientX - 2,
      y: event.clientY - 4,
    });

    // console.log(obj)

    // if(rightClickHandler) rightClickHandler(event, obj);
  };

  const contextMenuClose = () => {
    setPosition(contextMenuInitialState);
  };


  return { position, onRightClick, contextMenuClose }
}