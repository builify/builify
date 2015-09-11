var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, 'Application/JavaScript/Main.js')
    ],
    vendors: [
      'react',
      'react-dom',
      'react/addons',
      'react-color',
      'react-select',
      'react-redux',
      'react-custom-scrollbars',
      'redux',
      'redux-thunk',
      'strip-json-comments',
      'axios',
      'classnames',
      'immutable'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'DevelopmentBuild'),
    filename: 'main.js',
    publicPath: 'http://localhost:3000/DevelopmentBuild'
  },

  module: {
    loaders: [
      {
        test: [/\.js$/, /\.es6$/],
        exclude: [node_modules_dir],
        loaders: ['babel-loader?stage=0&externalHelpers=true']
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  resolve: {
    extensions: ['', '.json', '.jsx', '.js']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: "./DevelopmentBuild"
  },

  watch: true
};

module.exports = config;