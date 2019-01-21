const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const baseConfig = require('./base.config');
const { cssLoaders } = require('./utils');

const publicPath = 'http://localhost:3001/';

const entries = relative => [
  `webpack-hot-middleware/client?reload=true&path=http://localhost:3001/__webpack_hmr`,
  path.resolve(__dirname, './polyfill'),
  path.resolve(__dirname, relative),
];

const config = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: entries('../client'),
    second: entries('../client/second'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    publicPath,
  },
  devServer: {
    noInfo: true,
    publicPath,
    logLevel: 'silent',
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', ...cssLoaders],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', ...cssLoaders, 'sass-loader'],
      },
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          env: {
            development: {
              plugins: ['react-hot-loader/babel'],
            },
          },
        },
      },
    ],
  },
  plugins: [new WebpackBar({ name: 'Dev Client' }), new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(baseConfig, config);
