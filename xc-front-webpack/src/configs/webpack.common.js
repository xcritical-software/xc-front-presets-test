const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TeamcityBundleSizePlugin = require('../helper/teamcity-bundle-size');
const helper = require('../helper');


module.exports = (options) => {
  helper.env.showState();

  const devOptions = options.development || {};
  const prodOptions = options.production || {};

  const aliases = options.aliases || { development: {}, production: {} };

  return {
    mode: helper.env.getMode,
    context: helper.paths.SRC_DIR,
    entry: {
      app: './index',
    },
    output: {
      path: helper.paths.BUILD_DIR,
      publicPath: (helper.env.isDevMode ? devOptions.publicPath : prodOptions.publicPath) || '/',
      filename: helper.env.isDevMode ? '[name].[hash:8].js' : '[name].[contenthash].js',
      chunkFilename: helper.env.isDevMode ? '[name].[hash:8].js' : '[name].[contenthash].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: ['node_modules'],
      alias: helper.env.isDevMode ? {
        ...aliases.development,
        ...aliases.production,
      } : aliases.production,
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.tsx?$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'ts-loader',
                  options: options.typescript || {},
                },
              ],
            },
            {
              test: /\.(js|jsx)$/,
              exclude: [/node_modules/],
              use: {
                loader: 'babel-loader',
                options: helper.loaders.getBabelOptions({
                  babel: options.babel || {},
                  isDevMode: helper.env.isDevMode,
                }),
              },
            },
            {
              test: /\.(css)$/,
              loader: helper.loaders.generateStyleLoaders({ importLoaders: 1 }),
              sideEffects: true,
            },
            {
              test: /\.(eot|ttf|woff|woff2)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: 'fonts/[name].[ext]',
                  },
                },
              ],
            },
            {
              test: /\.(png|jpg|svg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: 'images/[name].[ext]',
                  },
                },
              ],
            },
          ].concat(options.loaders || []),
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: helper.env.isDevMode ? '[name].[hash:8].css' : '[name].[contenthash].css',
        chunkFilename: helper.env.isDevMode ? '[name].[hash:8].css' : '[name].[contenthash].css',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        template: helper.paths.pathResolve('public/index.html'),
        favicon: helper.paths.pathResolve('public/favicon.ico'),
        filename: 'index.html',
        minify: helper.env.isDevMode
          ? {}
          : {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
      }),
      new TeamcityBundleSizePlugin(),
    ].concat((options.plugins && options.plugins.common) || []).filter(Boolean),
    stats: {
      children: false,
      modules: false,
    },
    optimization: options.optimization,
    devtool: helper.env.isNeedSourceMaps ? 'source-map' : false,
  };
};
