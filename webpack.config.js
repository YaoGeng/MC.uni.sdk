let path = require('path')
let webpack = require('webpack');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');

module.exports = [
    {
          entry: {
              'sdk': './src/index.js'
          },
          output: {
              path: path.resolve(__dirname, 'dist'),
              filename: '[name].js',
              library: 'mcUniSdk',
              libraryTarget: "window"
          }
    }
  ]