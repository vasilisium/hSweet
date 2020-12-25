import { createPortal } from 'react-dom';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

// import KeyboardEventHandler from 'components/keyboardEventHandler/KeyboardEventHandler';

import styles from './Modal.module.css';

export const Modal = (props) => {

  const { on, onClose } = props;

  const closeModal = (e) => {
    e && e.stopPropagation();
    onClose && onClose(e);
  }

  const ModalBody = (props) =>{
    const {header, children, closeOnBackdropClick=true } = props;
    const bodyElement = (
      <div className={styles.backdrop} onClick={(e)=>closeOnBackdropClick && closeModal(e)}>
        <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
          <div className={styles.header}>
            <h6>
              {header}
            </h6>
            <div className={`${styles.btn} btn-outline-danger btn-sm`} onClick={closeModal}>
              <CloseSharpIcon/>
            </div>
          </div>
          <div className={styles.content}>
            {children}
            {/* <KeyboardEventHandler 
              handleKeys={['esc']} 
              onKeyEvent={(_, e)=>{closeModal(e)}}
              // isExclusive={true}
              handleFocusableElements={true}
            /> */}
          </div>
        </div>
      </div>
    )
    return createPortal(bodyElement, document.querySelector('#modal'))
  }

  return (on && <ModalBody {...props}/>) || null;
};