const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const webpackNodeExternals = require('webpack-node-externals');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./base.config');
const { entries, cssLoaders } = require('./utils');

const publicPath = 'http://localhost:3001/';

const config = {
  mode: 'development',
  target: 'node',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: entries('../server'),
    second: entries('../server/second'),
  },
  output: {
    path: path.join(__dirname, '../build', 'server'),
    filename: '[name].js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, ...cssLoaders],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, ...cssLoaders, 'sass-loader'],
      },
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new WebpackBar({ name: 'Dev Server' }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsPlugin({}),
    new WebpackAssetsManifest({ publicPath }),
  ],
};

module.exports = merge(baseConfig, config);
