require('dotenv').config({silent: true});

var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var paths = require('./paths');
var getClientEnvironment = require('./env');

var publicPath = paths.servedPath;
var publicUrl = publicPath.slice(0, -1);
var env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'static/css/[name].[contenthash:8].css';

// Webpack development config
module.exports = {

  entry: [
    'babel-polyfill',
    paths.appIndexJs
  ],

  output: {
    path: paths.appBuild,
    publicPath: publicPath,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
  },

  module: {
    rules: [
      // First, run the linter.
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: paths.appSrc,
        enforce: 'pre'
      },
      // Process JS with Babel.
      {
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            {
              loader: 'css-loader',
              options: { modules: true }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        // We use PostCSS for autoprefixing only.
        postcss: [
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ]
          })
        ]
      }
    }),
    // public/index.html 파일에 <script> 추가 함.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin(env.stringified),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin(cssFilename),
  ]

};
