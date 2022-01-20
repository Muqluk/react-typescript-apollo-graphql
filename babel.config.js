module.exports = {
  env: {
    test: {
      presets: [
        '@babel/env',
        '@babel/react',
        '@babel/typescript',
      ]
    }
  },
  presets: [
    '@babel/env',
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    '@emotion',
    ['@babel/plugin-transform-react-jsx', {
      pragmaFrag: 'React.Fragment',
    }],
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ],
  ]
};
