var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: path.join(__dirname, 'Application/JavaScript/Main.jsx'),
    vendors: ['react']
  },

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'main.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: [node_modules_dir],
        loader: 'babel',
        query: {
          presets:[
            'es2015',
            'stage-0',
            'react'
          ]
        }
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};
