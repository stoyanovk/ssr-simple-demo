const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { InjectManifest } = require('workbox-webpack-plugin')

const getPlugins = ({ isProd, analyze }) => {
  const plugins = [
    // extract css to external stylesheet file
    new MiniCssExtractPlugin({
      filename: isProd ? 'build/styles.[fullhash].css' : 'build/styles.css'
    }),

    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      minify: false,
      inject: 'body'
    }),

    new HTMLWebpackPlugin({
      filename: 'offline.html',
      template: path.resolve(__dirname, 'src/offline.html')
    }),

    new InjectManifest({
      swSrc: './src/service-worker.js'
    }),

    // copy static files from `src` to `dist`
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets')
        }
      ]
    })
  ]

  if (analyze) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  if (isProd) {
    plugins.push(new CleanWebpackPlugin())
  }

  return plugins
}

module.exports = (env, argv) => {
  const analyze = env.analyze
  const isProd = argv.mode === 'production'
  return {
    // entry files
    entry: [
      './src/index.js' // react
    ],

    // output files and chunks
    output: {
      path: path.join(__dirname, 'dist'),
      filename: isProd ? 'build/[name].[fullhash].js' : 'build/[name].js',
      publicPath: '/'
    },

    // module/loaders configuration
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name(resourcePath, resourceQuery) {
              if (process.env.NODE_ENV === 'development') {
                return '[path][name].[ext]'
              }

              return '[contenthash].[ext]'
            },
            outputPath: 'images'
          }
        },
        {
          test: /\.(woff?2|eot|ttf)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'fonts'
          }
        }
      ]
    },

    // webpack plugins
    plugins: getPlugins({ isProd, analyze }),

    // resolve files configuration
    resolve: {
      // file extensions
      extensions: ['.js', '.jsx', '.scss']
    },

    // webpack optimizations
    optimization: {
      minimize: isProd,
      minimizer: isProd ? [new TerserPlugin(), new CssMinimizerPlugin()] : [],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          vendor: isProd
            ? {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const packageName = module.context.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                  )[1]
                  return `npm.${packageName.replace('@', '')}`
                }
              }
            : {}
        }
      }
    },

    // generate source map
    devtool: !isProd && 'source-map'
  }
}
