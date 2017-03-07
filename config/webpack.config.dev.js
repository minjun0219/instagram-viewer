require('dotenv').config({silent: true});

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var paths = require('./paths');
var getClientEnvironment = require('./env');

var publicPath = '/';
var publicUrl = '';
var env = getClientEnvironment(publicUrl);

// Webpack development config
module.exports = {

  devtool: 'cheap-module-source-map',

  entry: [
    require.resolve('babel-polyfill'),
    require.resolve('react-hot-loader/patch'),
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    // 'react-dev-utils/webpackHotDevClient',
    paths.appIndexJs
  ],

  output: {
    path: paths.appPublic,
    publicPath: publicPath,
    filename: 'bundle.js',
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true
  },

  devServer: {
    contentBase: paths.appPublic,
    historyApiFallback: true
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[hash:base64]-[name]-[local]',
          }
        },
        { loader: 'sass-loader' }
      ]
    }, {
      test: /\.js$/,
      use: [
        // react-hot-loader 사용 (state가 유지 됨)
        // https://github.com/gaearon/react-hot-loader
        'react-hot-loader/webpack',
        'babel-loader'
      ],
      exclude: /node_modules/,
    }]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      //debug: true,
      babel: {
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            'react-hot-loader/babel'
          ]
        }
      }
    }),
    new webpack.DefinePlugin(env.stringified),
    // hot 업데이트 사용
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // public/index.html 파일에 <script> 추가 함.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    })
  ]

};
