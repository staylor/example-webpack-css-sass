const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const HashOutput = require('webpack-plugin-hash-output');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./base.config');
const { entries, cssLoaders } = require('./utils');

const publicPath = '/static/';

const config = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: {
    main: entries('../client'),
    second: entries('../client/second'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[chunkhash].js',
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
        use: [
          MiniCssExtractPlugin.loader,
          ...cssLoaders,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new WebpackBar({ name: 'Client' }),
    new HashOutput({
      manifestFiles: ['manifest'],
    }),

    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[name]-[contenthash].css',
    }),

    new OptimizeCssAssetsPlugin({}),
    new WebpackAssetsManifest({ publicPath }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = merge(baseConfig, config);
