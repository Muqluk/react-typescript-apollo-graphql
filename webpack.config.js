const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  const envSrcMapType = {
    local: 'source-map',
    dev: 'eval-source-map',
    qa: 'eval-source-map',
    prod: false,
  };

  return {
    devtool: envSrcMapType[env] || 'source-map',
    context: path.join(process.cwd()),
    mode: env !== 'prod' ? 'development' : 'production',
    target: 'web',
    entry: {
      src: 'src/index.tsx',
    },
    output: {
      path: path.join(process.cwd(), 'dist'),
      filename: '[name].bundle.js',
      publicPath: './',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', 'css', 'scss'],
      modules: [
        process.cwd(),
        path.join(process.cwd(), 'src'),
        path.join(process.cwd(), '.storybook'),
        'node_modules'
      ],
      alias: {
        '@decorators': path.join(process.cwd(), '.storybook/decorators'),
        '@appState': path.join(process.cwd(), 'src/app-base/state'),
        '@utilities': path.join(process.cwd(), 'src/common/utilities'),
        '@common': path.join(process.cwd(), 'src/common'),
        '@domains': path.join(process.cwd(), 'src/domains'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            sourceMaps: true,
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: 'public',
              },
            },
            // Creates `style` nodes from JS strings
            // "style-loader",
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: 'public',
              },
            },
            // Creates `style` nodes from JS strings
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(ttf|eot|svg|gif|ico|jpg|png|bmp)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },
    performance: false,
    plugins: [
      new ESLintPlugin({
        extensions: ['.js', '.ts', '.tsx', '.mdx'],
        fix: true, // be careful with changing this to true.
        failOnWarning: false,
        outputReport: true,
      }),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        PropTypes: 'prop-types',
      }),
      new CleanWebpackPlugin({
        dry: false,
        verbose: false,
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: true,
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        minify: {
          minifyJS: false,
        },
      }),
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css',
      }),
    ],
    // from here down, environment should be taken into consideration.  Not yet, but soon.
    stats: 'minimal',
    devServer: {
      allowedHosts: [
        'all',
      ],
      bonjour: false,
      client: {
        logging: 'error', //  'log' | 'info' | 'warn' | 'error' | 'none' | 'verbose'
        overlay: {
          errors: false,
          warnings: false,
        },
        progress: true,
      },
      compress: true,
      historyApiFallback: true,
      host: 'localhost',
      hot: true,
      liveReload: false,
      open: true,
      port: 9000, // alternative:  port: 'auto',
      static: path.join(process.cwd(), 'public'),
      devMiddleware: {
        // requires webpack/webpack-dev-middleware (https://github.com/webpack/webpack-dev-middleware);
        index: true,
        //mimeTypes: { 'text/html': ['phtml'] },
        publicPath: '/',
        //serverSideRender: true,
        writeToDisk: true,
      },
      //#region https: options
      // https: true,
      //    OR
      // https: {
      //   cacert: './server.pem',
      //   pfx: './server.pfx',
      //   key: './server.key',
      //   cert: './server.crt',
      //   passphrase: 'webpack-dev-server',
      //   requestCert: true,
      // },
      //#endregion
    },
    infrastructureLogging: {
      appendOnly: true,
      colors: true,
      // 'info' : 'none' | 'error' | 'warn' | 'info' | 'log' | 'verbose'
      level: 'warn',
    }
  };
};
