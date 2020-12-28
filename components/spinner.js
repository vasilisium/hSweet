import LinearProgress from '@material-ui/core/LinearProgress'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  console.log(theme.mixins.toolbar)
  return {
    progress: {
      position: 'absolute',
      top:theme.mixins.toolbar.bottom,
      left:0,
      width:'100vw',
    }
  }
});

const LoadingSpinner = () => {
  const classes = useStyles()
  return (<>
    <LinearProgress className={classes.progress}/>
  </>)
}

export default LoadingSpinner
