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
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

import { withTheme } from '@material-ui/core/styles';

import NavLink from 'components/layouts/navLink';
import styles from './nav.module.css';
import { modes, actionsTypes } from 'redux/theme-Reducer'

const Nav = withTheme((props) => {
  const { currentRout } = props;

  const themeMode = useSelector(state=>state.theme.mode);
  const dispatch = useDispatch()
  // const toggleTheme = dispatch(toggle_Action)

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

  const [ isPop, setIsPop] = useState(false);

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
            {linksList.map((link, index) => (
              <NavLink
                label={link.label}
                rout={link.rout}
                isActive={currentRout === link.rout}
                key={index}
              />
            ))}
          </Hidden>
        </div>

        <div>
          <Tooltip
            title={ themeMode == modes.dark ? 'Toggle to light mod' :'Toggle to dark mod' }
            placement='left'
            arrow
          >
            <IconButton color="inherit"
              onClick={()=>dispatch({type:actionsTypes.TOGGLE})}
            >
              { themeMode == modes.dark ? <WbSunnyIcon/> : <Brightness3Icon /> }
            </IconButton>
          </Tooltip>
          <Hidden smUp>
            <IconButton color="inherit" onClick={()=>setIsPop(true)}>
              <MenuIcon />
            </IconButton>
            <Popover open={isPop}
              className={styles.pop}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 54, left: 0 }}
              style={{borderRadius:0}}
              onClose={()=>{setIsPop(false)}}
            >
              <div className={styles.popContent}>
                {linksList.map((link, index) => (
                  <NavLink
                    label={link.label}
                    rout={link.rout}
                    isActive={currentRout === link.rout}
                    key={index}
                    onClick={()=>{setIsPop(false)}}
                  />
                ))}
              </div>
            </Popover>
          </Hidden>
        </div>

      </Toolbar>
    </AppBar>
  )
})

// export default Nav
Nav.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(Nav);