import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';

export const defaultTheme = createMuiTheme(
  {
    // palette:{
    //   primary:{dark}
    // },
    // overrides:{
    //   MuiTextField:{
    //     root:{
    //       borderStyle:'1px solid green'
    //     }
    //   }
    // }
  }
);

export const theme = (themeMode) => {
  const isDark = themeMode === 'dark';

  const commonOptions = {
    palette: {
      primary: deepPurple
      // secondary: {
      //   main: '#ffb74d',
      // },
    },
    shape: {
      borderRadius: 0
    },
    props: {
      MuiButton: {
        disableElevation: true
      },
    },
  }


  const darkOptions = {
    palette: {
      type: 'dark',
      primary: {
        main: '#ff6e40',
      },
      secondary: {
        main: '#00838f',
      },
      background: { paper: '#262626' }
    },
    overrides: {
      // MuiAppBar: {
      //   colorPrimary: {
      //     backgroundColor: purple[700]
      //   }
      // },
      // MuiButton:{
      //   contained:{
      //     // backgroundColor: grey[800],
      //     '&:hover':{
      //       backgroundColor: '#ffb199',
      //     },
      //     color: 'inherit',
      //   }
      // }
    },
  }

  return createMuiTheme(Object.assign(commonOptions, ...(isDark ? [darkOptions] : [])))
};

export const GlobalCss = withStyles(theme => {
  // console.log(theme)
  return {
    '@global': {
      '.MuiTextField-root': {
        // root: {
        // '& label.Mui-focused': {
        //   color: 'green',
        // },
        // '& .MuiInput-underline:after': {
        //   borderBottomColor: 'green',
        // },
        '& .MuiOutlinedInput-root': {
          // '& fieldset': {
          //   borderColor: 'black',
          // },
          // '&:hover fieldset': {
          //   borderColor: theme.palette.text,
          // },
          // '&.Mui-focused fieldset': {
          //   borderColor: theme.palette.primary
          // },
        },
        // },
      },
    },
  }
})(() => null);