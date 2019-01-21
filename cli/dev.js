const express = require('express');
const webpack = require('webpack');
const nodemon = require('nodemon');
const chokidar = require('chokidar');
const path = require('path');
const cors = require('cors');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const serverConfig = require('../webpack/dev.server');
const clientConfig = require('../webpack/dev.client');

const serverCompiler = webpack(serverConfig);

const startServer = () => {
  const serverPaths = Object.keys(serverCompiler.options.entry).map(entry =>
    path.join(serverCompiler.options.output.path, `${entry}.js`)
  );
  const mainPath = path.join(serverCompiler.options.output.path, 'main.js');

  nodemon({ script: mainPath, watch: serverPaths })
    .once('start', () => {
      console.log('Development started');
    })
    .on('restart', () => console.log('Development server restarted'))
    .on('quit', process.exit);
};

let serverStarted = false;
serverCompiler.plugin('done', () => {
  if (serverStarted) {
    return;
  }

  serverStarted = true;
  startServer();
});

const compileServer = () => {
  serverCompiler.run(() => undefined);
};

const clientCompiler = webpack(clientConfig);
clientCompiler.plugin('done', () => {
  compileServer();
});

const watcher = chokidar.watch([path.resolve(__dirname, '../server')]);
watcher.on('ready', () => {
  watcher
    .on('add', compileServer)
    .on('addDir', compileServer)
    .on('change', compileServer)
    .on('unlink', compileServer)
    .on('unlinkDir', compileServer);
});

const app = express();
app.use(cors());
app.use(devMiddleware(clientCompiler, clientConfig.devServer));
app.use(hotMiddleware(clientCompiler));

app.listen(3001, () => {
  console.log('Client assets serving from http://localhost:3001');
});
