process.env.NODE_ENV = 'development';

require('dotenv').config({silent: true});

import chalk from 'chalk';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import apiRouter from '../config/apiRouter';
const port = parseInt(process.env.PORT, 10) || 3000;

console.log(chalk.yellow('Server is running on development mode'));

const config = require('../config/webpack.config.dev');
let compiler = webpack(config);

const devServerOpts = {
  ...config.devServer,
  setup: (app) => {
    apiRouter(app);
  },
  hot: true,
  inline: true,
  stats: {
    colors: true
  }
};
let devServer = new WebpackDevServer(compiler, devServerOpts);
devServer.listen(port, () => {
  console.log('webpack-dev-server is listening on port', chalk.bgRed(port));
});
