import { MockedProvider } from '@apollo/client/testing';
import { AppState } from './decorators/global/appStateProvider';
import EmotionThemeProvider from './decorators/global/themeProvider';
export const decorators = [AppState, EmotionThemeProvider];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  apolloClient: {
    MockedProvider,
  },
  // Consumed by:  @mverissimoo/storybook-addon-status/preset
  badges: {
    custom: {
      title: 'some badge',
      color: '#FFFFFF',
      background: '#000000',
    },
  },
  // TODO: Read more on this later.  May be fun.
  // https://storybook.js.org/addons/storybook-addon-themes
  themes: {
    default: 'twitter',
    list: [
      { name: 'twitter', class: 'theme-twt', color: '#00aced' },
      { name: 'facebook', class: 'theme-fb', color: '#3b5998' }
    ],
  },
}
