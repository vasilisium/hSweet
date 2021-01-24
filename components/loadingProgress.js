import LinearProgress from '@material-ui/core/LinearProgress'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  // console.log(theme.palette.background.paper)
  // console.log('theme.palette.grey')
  return {
    progress: {
      position: 'absolute',
      top:theme.mixins.toolbar.bottom,
      left:0,
      width:'100vw',
    },
    colorPrimary: {
      backgroundColor: theme.palette.background.paper,
    },
    // barColorPrimary: {
    //   // backgroundColor: 'white',
    // }
  }
});

const LoadingProgress = () => {
  const classes = useStyles()
  return (
    <LinearProgress 
      className={classes.progress}
      classes={{
        // barColorPrimary: classes.barColorPrimary,
        colorPrimary: classes.colorPrimary,
      }}
    />
  )
}

export default LoadingProgress
