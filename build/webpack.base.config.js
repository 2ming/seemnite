'use strict'

const fs = require('fs')
const path = require('path')
const config = require('config')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = dir => path.resolve(__dirname, dir)

config.fe.host = config.host
config.fe.port = config.port
fs.writeFileSync(resolve('../views/config.json'), JSON.stringify(config.fe))

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: resolve('../dist'),
    publicPath: config.get('fe.publicPath'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md'],
    alias: {
      'pages': resolve('../views/pages'),
      'components': resolve('../views/components'),
      'config': resolve('../views/config.json')
    }
  },
  externals: {
    hljs: 'highlight.js'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.(vue|js)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          },
          loaders: utils.cssLoaders({
            sourceMap: isProd,
            extract: isProd
          })
          extractCSS: isProd,
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      ...utils.styleLoaders({ extract: isProd, sourceMap: true })
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin(),
      ]
}
