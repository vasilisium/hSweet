import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import KeyboardEventHandler from 'components/keyboardEventHandler/KeyboardEventHandler';
import { useBinaryState } from 'hooks/useBinaryState'

import styles from './SideHider.module.css';

const SideHider = (props) => {

    const { isShowing, toggle, hide } = useBinaryState();

    // if (typeof window === 'undefined') {
    //     global.window = {}
    // }
    
    const SideHiderBody = (props) => {
        const {children} = props;

        return ( 
            <>
                <KeyboardEventHandler handleKeys={['esc']} onKeyEvent={hide} />
                { children }
            </>
        )
    }

    return (
        <div className={`${styles.wrapper} ${isShowing ? styles.isOpened : styles.isClosed}`}>
            <div className={`${styles.contentContainer} ${isShowing || styles.isClosed}`}>
                {isShowing && <SideHiderBody {...props}/>}
            </div>
            <div 
                className={`${styles.iconWrapper}${isShowing ? ' '+styles.is_opened:''}`}
                onClick={ toggle }
            >
                <div className={ styles.icon } >
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
            </div>
            {isShowing &&
                <div className={styles.spacer} onClick={()=>hide()}/>
            }
        </div>
    )
}

export default SideHider