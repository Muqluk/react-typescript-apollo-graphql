import React, { JSXElementConstructor, ReactElement } from 'react';
import { Provider } from 'react-redux';
// next time I get around to goofing with aliases in decorators, take a look at this
//      https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
import store, { history } from '@appState/store'; // eslint is just goofy. This works just fine.
import { ConnectedRouter } from 'connected-react-router';

interface p { }

export const AppState = (Story: JSXElementConstructor<p>): ReactElement => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Story />
    </ConnectedRouter>
  </Provider>
);
