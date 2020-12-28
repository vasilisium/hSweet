import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
// import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import CheckIcon from '@material-ui/icons/Check';

// import styles  from './groupsList.module.css';

const GroupListItem = (props) => {
  const { obj, selected, onSelect, onRightClick} = props;
  const { id, name, description } = obj;

  return (
    <ListItem button onClick={() => onSelect(obj)} 
      onContextMenu={(e)=>{
        // console.log(obj)
        onRightClick(e, obj)
      }}
    >
      <ListItemText primary={name} />
      { selected ? 
        <ListItemSecondaryAction>
          <CheckIcon />
        </ListItemSecondaryAction>
        : null
      }
    </ListItem>
  )
}

export default GroupListItem;