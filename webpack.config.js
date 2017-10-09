const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');

let jsDir = path.resolve(__dirname, 'dist');

module.exports = {
  target: 'electron-main',
  context: path.join(__dirname, 'src'),
  entry: {
    // Common
    main: './main',
    app: './assets/ts/app'
  },
  output: {
    path: jsDir,
    filename: '[name].js',
  },
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.styl',
    ],
  },
  module: {
    rules: [{
        test: /\.ts(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'awesome-typescript-loader',
        }],
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(['css-loader']),
      }, {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract(['css-loader', 'stylus-loader']),
      }],
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './index.html',
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   filename: 'common.js',
    // }),
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
    }),
    // new UglifyJSPlugin({
    //   uglifyOptions: {
    //     beautify: false,
    //     ecma: 6,
    //     compress: true,
    //     comments: false
    //   }
    // }),
    new ExtractTextPlugin('[name].css'),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    }),
  ],
};
