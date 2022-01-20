import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';

import store, { history } from 'src/app-base/state/store';
import client from '@common/utilities/graph-ql-client';
// import ThemeProvider from '@common/components/theme/theme-provider';

import Layout from './layout';

const AppBase = (): ReactElement => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <ThemeProvider> */}
        <CssBaseline />
        <Layout />
        {/* </ThemeProvider> */}
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
);

export default AppBase;
