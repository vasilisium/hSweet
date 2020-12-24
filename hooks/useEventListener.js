import { useEffect } from 'react';

export const useEventListener = (eventType, handler, options) =>{
    useEffect(()=>{
        if(!window) return;
        window.addEventListener(eventType, handler, options);
        return ()=>{
            window.removeEventListener(eventType, handler, options);
        }
    },[])
};

export const useEscKeyDownEventListener = (handler, options) => {
    const eventType = 'keydown';
    const keyCode = 27;

    const internalHandler = (e) => {
        if (e.keyCode === keyCode) {
            // console.log('Esc keydown event');
            // e.stopPropagation();
            if(handler) handler();
        }
    }

    useEventListener(eventType, internalHandler, options);
};