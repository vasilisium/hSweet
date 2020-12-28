import Head from 'next/head';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { ThemeProvider, ServerStyleSheets } from '@material-ui/core/styles';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Nav from './nav';
import { theme, GlobalCss  } from './theme';
import styles from './layout.module.css';

const useStyles = makeStyles((theme) => {
  return {
    toolbar: theme.mixins.toolbar,
    globalContainer:{
      height:'100%',
      display: 'grid',
      gridTemplateRows: 'auto 1fr'
    }
  }
});

const Layout = ({ children }) => {

  const router = useRouter();
  const sheets = new ServerStyleSheets();

  const themeMode = useSelector(state => state.theme.mode);
  
  const classes = useStyles();

  return (sheets.collect(
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline />
      <GlobalCss />
      <Head>
        <title>SHome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Paper style={{ height: '100%' }}>
        <Container className={styles.container} style={{ height: '100%' }}>
          <Nav currentRout={router.pathname} />
          <Container className={classes.globalContainer}>
            <div className={classes.toolbar} />
            <div>
              {children}
            </div>
          </Container>
        </Container>
      </Paper>

    </ThemeProvider>
  ))
}

export default Layout;