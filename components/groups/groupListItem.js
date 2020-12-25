import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp';

import styles  from './groupsList.module.css';

const GroupListItem = (props) => {
    const { obj, selected, onSelect } = props;
    const { id, name, description } = obj;

    return (
        <div 
            className={`mx-3 my-1 ${styles.labelWithIcon} ${styles.listItem}${selected?' '+styles['selected']:''}`} 
            onClick={()=>onSelect(obj)}
        >
            {selected ? <KeyboardArrowDownSharpIcon/> : <ChevronRightSharpIcon/>}
            <label className={selected && 'font-weight-bold'}>{name}</label>
        </div>
    )
}

export default GroupListItem;