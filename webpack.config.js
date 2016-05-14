var path = require('path');
var webpack = require('webpack');

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
        exclude: [path.resolve(__dirname, 'node_modules')],
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
