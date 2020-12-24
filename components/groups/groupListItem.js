// import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import styles  from './groupsList.module.css';

const GroupListItem = (props) => {
    const { obj, selected, onSelect } = props;
    const { id, name, description } = obj;

    return (
        <div 
            className={`mx-3 my-1 ${styles.labelWithIcon} ${styles.listItem}${selected?' '+styles['selected']:''}`} 
            onClick={()=>onSelect(obj)}
        >
            <FontAwesomeIcon icon={selected ? faFolderOpen: faFolder}/>
            <label className={selected && 'font-weight-bold'}>{name}</label>
        </div>
    )
}

export default GroupListItem;