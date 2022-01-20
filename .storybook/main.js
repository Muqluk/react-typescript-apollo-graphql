// .storybook/main.js
const path = require('path');
const appWebpack = require(path.join(process.cwd(), 'webpack.config.js'));

module.exports = {
  stories: [
    '../src/**/*.stories.@(tsx|mdx)',
    './dev-tools/**/*.stories.@(tsx|mdx)',
  ],
  addons: [
    '@react-theming/storybook-addon',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-scss',
    'storybook-addon-apollo-client',
    //    Ref:  https://storybook.js.org/addons/storybook-addon-pseudo-states
    'storybook-addon-pseudo-states',
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    const emotionReactEleven = path.dirname(require.resolve('@emotion/react/package.json'));
    const emotionStyledEleven = path.dirname(require.resolve('@emotion/styled/package.json'));
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      ...appWebpack().resolve.modules,
    ];
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...appWebpack().resolve.alias,
      'src': path.join(process.cwd(), 'src'),
      '@emotion/core': emotionReactEleven,
      '@emotion/styled': emotionStyledEleven,
      'emotion-theming': emotionReactEleven,
    };

    return config;
  },
};
