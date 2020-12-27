import { useState } from 'react'
import PropTypes from 'prop-types';

import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import Hidden from '@material-ui/core/Hidden'
// import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

import { withTheme, withStyles } from '@material-ui/core/styles';

import styles from './nav.module.css';
import { modes, actionsTypes } from 'redux/theme-Reducer'
import { TopLinksList, SideLinksList } from './LinksList'
import SideDrawer from 'components/sideDrawer/sideDrawer';
import { useBinaryState } from "hooks/useBinaryState";

const Nav = withTheme((props) => {
  const { currentRout } = props;

  const themeMode = useSelector(state => state.theme.mode);
  const dispatch = useDispatch()

  const linksList = [
    {
      label: 'Home',
      rout: '/'
    },
    {
      label: 'Groups',
      rout: '/groups'
    },
    {
      label: 'About',
      rout: '/about'
    },
  ]

  const { isShowing, toggle, show, hide } = useBinaryState();

  const MyToolTip = withStyles({
    tooltipPlacementLeft: {
      margin: "0 8px",
    },
  })(Tooltip)

  return (
    <AppBar>
      <Toolbar className={styles.nav}>
        <Link href='/'>
          <a className={styles.brandLink}>
            <HomeIcon />
            <Typography variant="h6" color="inherit">
              SHome
            </Typography>
          </a>
        </Link>

        <div className={styles.links}>
          <Hidden xsDown>
            <TopLinksList linksList={linksList} currentRout={currentRout} />
          </Hidden>
        </div>

        <div>
          <MyToolTip
            title={themeMode == modes.dark ? 'Toggle to light mod' : 'Toggle to dark mod'}
            placement='left'
            arrow
          >
            <IconButton color="inherit"
              onClick={() => dispatch({ type: actionsTypes.TOGGLE })}
            >
              {themeMode == modes.dark ? <WbSunnyIcon /> : <Brightness3Icon />}
            </IconButton>
          </MyToolTip>
          <Hidden smUp>
            <IconButton color="inherit" onClick={show}>
              <MenuIcon />
            </IconButton>
            <SideDrawer side='right' isOpen={isShowing} closeHandler={hide}>
              <SideLinksList linksList={linksList} currentRout={currentRout} onClick={hide} />
            </SideDrawer>
          </Hidden>
        </div>

      </Toolbar>
    </AppBar>
  )
})

Nav.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(Nav);