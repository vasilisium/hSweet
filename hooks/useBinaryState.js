import { useState } from 'react';

export const useBinaryState = () => {
    const [isShowing, setIsShowing] = useState(false);
  
    const toggle = () => setIsShowing(!isShowing);
    const show = () => setIsShowing(true);
    const hide = () => setIsShowing(false);
  
    return { isShowing, toggle, show, hide };
};