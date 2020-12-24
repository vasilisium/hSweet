import { Provider } from 'react-redux';

import { useStore } from 'redux/store'
import 'styles/globals.css'
import Layout from 'components/layouts/layout'


const App = ({ Component, pageProps }) => {
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