import { useState } from 'react';

export const useContextMenu = () => {
  const contextMenuInitialState = { x: null, y: null };
  const [position, setPosition] = useState(contextMenuInitialState);
  const [clickedObject, setObj] =useState(null);

  const onRightClick = (event, obj) => {
    event.preventDefault();
    setPosition({
      x: event.clientX - 2,
      y: event.clientY - 4,
    });

    // console.log(obj)
    setObj(obj);
  };

  const contextMenuClose = () => {
    setPosition(contextMenuInitialState);
    setObj(null);
  };


  return { position, onRightClick, contextMenuClose, clickedObject }
}