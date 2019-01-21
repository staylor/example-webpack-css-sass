const path = require('path');
const postcssConfig = require('./postcss.config');

exports.entries = relative => [
  path.resolve(__dirname, './polyfill'),
  path.resolve(__dirname, relative),
];

exports.cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[name]-[local]--[hash:base64:5]',
    },
  },
  { loader: 'postcss-loader', options: postcssConfig },
];
