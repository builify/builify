import webpack from 'webpack';
import config from './config';
import pckg from './package';

var DashboardPlugin = require('webpack-dashboard/plugin');

export default {
  cache: config.env.debug,
  debug: config.env.debug,
  watch: config.env.debug,
  entry: {
    app: config.javascripts.main.entry,
    vendors: config.vendors
  },

  output: {
    path: config.javascripts.main.output,
    filename: 'application.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env.debug ? 'development' : 'production'),
      'process.env.DEMO': JSON.stringify(config.env.demo ? true : false),
      'process.env.VERSION': JSON.stringify(pckg.version)
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new DashboardPlugin()
  ],

  module: {
    loaders: [{
      test: /\.(js|jsx)?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.json', '.es6', '.jsx'],
    modulesDirectories: [
      'source',
      'source/javascript',
      'node_modules'
    ]
  },

  node: {
    fs: 'empty'
  }
};
