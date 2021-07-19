const path = require('path')
const nodeExternals = require('webpack-node-externals')

const ignoreRegExp = /\.(scss|css|png|jpe?g|gif|svg|woff?2|eot|ttf)$/
module.exports = {
  name: 'server',
  target: 'node',

  // entry files
  entry: [
    './server/index.js' // react
  ],

  // output files and chunks
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },

  // module/loaders configuration
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: ignoreRegExp,
        use: 'null-loader'
      }
    ]
  },

  // resolve files configuration
  resolve: {
    // file extensions
    extensions: ['.js', '.jsx']
  },

  devtool: 'source-map',
  externals: [nodeExternals()]
}
