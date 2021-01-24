import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import BuildIcon from '@material-ui/icons/Build';

export const actions = {
  create:'GROUP/CREATE',
  rename: 'GROUP/RENAME',
  modify:'GROUP/MODIFY'
}
export const commonItems = [
  {
    icon: <AddIcon />,
    label: 'New',
    action: 'GROUP/CREATE',
  }
]

export const objectiveItems = [
  {
    icon: <EditIcon />,
    label: 'Rename',
    action: 'GROUP/RENAME',
  },
  {
    icon: <BuildIcon />,
    label: 'Modify',
    action: 'GROUP/MODIFY',
  }
]