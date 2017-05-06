const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    library: 'json-md',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'src'],
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'babel-loader!awesome-typescript-loader' }
    ]
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin()
  ]
}
