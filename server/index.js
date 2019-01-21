import fs from 'fs';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './template';
import App from '../components/App';

const app = express();

let assets = {
  'main.js': 'http://localhost:3001/main.js',
};

let css;

if (process.env.NODE_ENV === 'development') {
  css = fs.readFileSync(path.join(process.cwd(), 'build/server/main.css'));
  app.use(express.static('build'));
} else {
  const assetJSON = fs.readFileSync(path.join(process.cwd(), 'build/manifest.json'));
  assets = JSON.parse(assetJSON);
  app.use('/static', express.static('build'));
}

app.get('/', (req, res) => {
  const html = renderToString(<App />);

  res.send(
    template({
      html,
      assets,
      css,
    })
  );
});

app.listen(3000, () => {
  console.log('Server running at: http://localhost:3000');
});

process.on('SIGINT', process.exit);
process.on('SIGTERM', process.exit);
