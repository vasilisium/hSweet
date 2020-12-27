import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const SButton = withStyles( theme => {
  return theme.palette.type === 'dark' ?
    {
      root: {
        background: theme.palette.grey[800],
        '&:hover': {
          background: theme.palette.grey[700]
        },
        color: 'inherit',
      },
    }
  : {}
})(Button);

export default SButton
