import React from 'react';
import '@/styles/globals.css';
import '@/styles/normalize.css';
import '@/styles/placeholder.css';
import { Layout } from '@/components/Layout';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { useStore } from 'reduxSaga';
import { ConnectedRouter } from 'connected-next-router';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ConnectedRouter>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
}

export default MyApp;
