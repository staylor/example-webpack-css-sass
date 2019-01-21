import fs from 'fs';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './template';
import Entry from '../components/Entry';

const app = express();

let assets = {
  'main.css': 'http://localhost:3001/second.css',
  'main.js': 'http://localhost:3001/second.js',
};

if (process.env.NODE_ENV === 'development') {
  app.use(express.static('build'));
} else {
  const assetJSON = fs.readFileSync(path.join(process.cwd(), 'build', 'manifest.json'));
  assets = JSON.parse(assetJSON);

  app.use('/static', express.static('build'));
}

app.get('/', (req, res) => {
  const html = renderToString(<Entry />);

  res.send(
    template({
      html,
      assets,
    })
  );
});

app.listen(3000);

process.on('SIGINT', process.exit);
process.on('SIGTERM', process.exit);
