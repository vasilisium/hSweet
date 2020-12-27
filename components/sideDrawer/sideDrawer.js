// import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme) =>({
  container: {
    width: 250,
    height:'100%',
    display: 'grid',
    gridTemplateRows: '1fr auto',
    position:'relative',
  },
}));

const SideDrawer = ({ side, children, isOpen, closeHandler }) => {
  const classes = useStyles();

  return (
    <Drawer anchor={side} open={isOpen} onClose={closeHandler} >
      <div className={classes.container}>
        {children}

        {/* <List >
          <ListItem button onClick={closeHandler} >
            <ListItemIcon >
              <ChevronLeftIcon/>
            </ListItemIcon>
            <ListItemText primary="Close" />
          </ListItem>
        </List> */}

        <Box m={1} display='flex' justifyContent="flex-start">
          <Button
            variant="outlined"
            startIcon={<ChevronLeftIcon />}
            color="primary"
            onClick={closeHandler}
          >
            Close
          </Button>
        </Box>
      </div>
    </Drawer>
  );
}

export default SideDrawer;

