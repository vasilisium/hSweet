import { useEffect, useState, useRef } from 'react';

import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';

import { makeStyles } from '@material-ui/core/styles';

import { useBinaryState } from 'hooks/useBinaryState';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export const OptionsButton = ({ delay, icon, children, defaultAction }) => {
  const classes = useStyles();

  const [initiated, setInitiated] = useState(false);
  const fabRef = useRef();
  const fabMenuState = useBinaryState();

  useEffect(() => {
    // for the Warning: Can't perform a React state update on an unmounted component
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;

    if (delay && delay > 0) setTimeout(() => {
      if (isMounted) setInitiated(true)
    }, delay)

    return () => { isMounted = false }
  }, [])

  return (
    <>
      <Zoom
        in={initiated}
      >
        <Fab color='primary' className={classes.fab} 
          onClick={(e)=>defaultAction ? defaultAction(e) : fabMenuState.show(e)}
          ref={fabRef}
        >
          { icon }
        </Fab>
      </Zoom>

      <Menu
        keepMounted
        open={fabMenuState.isShowing}
        onClose={fabMenuState.hide}
        anchorEl={fabRef.current}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {children}
      </Menu>
    </>
  )
};
