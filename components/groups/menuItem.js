import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr'
  },
  label: {
    margin: '0 auto'
  }
}));


export const IMenuItem = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { label, icon, action, callback } = props
  return (
    <MenuItem className={classes.grid} innerRef={ref}
      onClick={()=>{callback(action)}}
    >
      {icon}
      <span className={classes.label}>
        {label}
      </span>
    </MenuItem>
  )
});