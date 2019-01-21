const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const HashOutput = require('webpack-plugin-hash-output');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./base.config');
const { entries, cssLoaders } = require('./utils');

const publicPath = '/static/';

const config = {
  mode: 'production',
  target: 'node',
  devtool: 'source-map',
  entry: {
    main: entries('../server'),
    second: entries('../server/second'),
  },
  output: {
    path: path.join(__dirname, '../build', 'server'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...cssLoaders],
      },
      {
        test: /\.scss$/,
        use: [...cssLoaders, 'sass-loader'],
      },
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: webpackNodeExternals(),
  plugins: [
    new WebpackBar({ name: 'Server' }),
    new HashOutput({
      manifestFiles: ['manifest'],
    }),
    new WebpackAssetsManifest({ publicPath }),
  ],
};

module.exports = merge(baseConfig, config);
