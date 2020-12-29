import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import BuildIcon from '@material-ui/icons/Build';

export const commonItems = [
  {
    icon: <AddIcon />,
    label: 'New',
    action: 'CREATE_GROUP'
  }
]

export const objectiveItems = [
  {
    icon: <EditIcon />,
    label: 'Rename'
  },
  {
    icon: <BuildIcon />,
    label: 'Modify'
  }
]