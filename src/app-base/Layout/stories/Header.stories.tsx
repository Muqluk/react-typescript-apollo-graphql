import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from '@appState/store';
import { Header } from '../header';

export default {
  title: 'Application/Layout/Header',
  component: Header,
  decorators: [(Story: any) => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Story />
      </ConnectedRouter>
    </Provider>
  )],
};

const Template = () => <Header />;

export const InitialState = Template.bind({});
