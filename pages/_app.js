import { useEffect } from 'react';

import { Provider } from 'react-redux';

import { useStore } from 'redux/store'
import 'styles/globals.css'
import Layout from 'components/layouts/layout'


const App = ({ Component, pageProps }) => {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App;