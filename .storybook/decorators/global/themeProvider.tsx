/** @jsx jsx */
import React, { JSXElementConstructor, ReactElement } from 'react';
import { addDecorator } from '@storybook/react';
import { withThemes } from '@react-theming/storybook-addon';
// import ThemeProvider, { defaultTheme } from '@common/components/theme/theme-provider'; // eslint is goofy.  it works.
import { jsx, css } from '@emotion/react';

// https://github.com/react-theming/storybook-addon

// pass ThemeProvider and array of your themes to decorator
// addDecorator(withThemes(ThemeProvider, [defaultTheme]));
// export default withThemes(ThemeProvider, [defaultTheme]);

interface p { }

export default (Story: JSXElementConstructor<p>): ReactElement => (
  // <ThemeProvider theme={defaultTheme}>
  <Story />
  // </ThemeProvider>
);
