import Head from 'next/head';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { createMuiTheme, ThemeProvider, ServerStyleSheets } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Nav from './nav';
import styles from './layout.module.css';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const Layout = ({ children }) => {

  const router = useRouter();
  const sheets = new ServerStyleSheets();

  const themeMode = useSelector(state=>state.theme.mode);
  const theme = createMuiTheme({
    palette: {
      type: themeMode,
    },
  });
  const classes = useStyles();
  // console.log(classes);

  return (sheets.collect(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Head>
        <title>SHome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Paper style={{height: '100%'}}> 
        <Container className={styles.container} style={{height:'100%'}}>
          <Nav currentRout={router.pathname} />
          <Container>
            <div className={classes.toolbar} />
            {children}
          </Container>
        </Container>
      </Paper>

      </ThemeProvider>
  ))
}

export default Layout;