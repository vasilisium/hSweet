import Link from 'next/link';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

const TopLink = (props) => {
  const { isActive, label, rout } = props;

  return (
    <Link href={rout}>
      <Button className={`${isActive && ' active'}`} color="inherit">
        {label}
        {isActive && <Typography variant="srOnly">(current)</Typography>}
      </Button>
    </Link>
  )
}

export const TopLinksList = ({ linksList, currentRout }) => {
  return (
    <>
      {linksList.map((link, index) => (
        <TopLink
          label={link.label}
          rout={link.rout}
          isActive={currentRout === link.rout}
          key={index}
        />
      ))}
    </>
  )
}

const SideLink = (props) => {
  const { isActive, label, rout, onClick } = props;

  return (
    <Link href={rout}>

      <ListItem button component="a" className={`${isActive && ' active'}`} onClick={onClick}>
        <ListItemText primary={label} />
        {isActive && <Typography variant="srOnly">(current)</Typography>}
      </ListItem>
    </Link>
  )
}

export const SideLinksList = ({ linksList, currentRout, onClick }) => {
  return (
    <List component="nav" aria-label="secondary mailbox folders" >
      {linksList.map((link, index) => (
        <SideLink
          label={link.label}
          rout={link.rout}
          isActive={currentRout === link.rout}
          key={index}
          onClick={onClick}
        />
      ))}
    </List>
  )
}