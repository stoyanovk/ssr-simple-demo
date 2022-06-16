const path = require('path')
const nodeExternals = require('webpack-node-externals')

const ignoreRegExp = /\.(png|jpe?g|gif|svg|woff?2|eot|ttf)$/
module.exports = {
  name: 'server',
  target: 'node',

  // entry files
  entry: [
    './server/index.js' // react
  ],

  // output files and chunks
  output: {
    path: path.resolve(__dirname, 'static'),
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
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader', //2
            options: {
              import: false,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportOnlyLocals: true
              }
            }
          }
        ]
      }
    ]
  },

  // resolve files configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    // file extensions
    extensions: ['.js', '.jsx']
  },

  devtool: 'source-map',
  externals: [nodeExternals()]
}
