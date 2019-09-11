const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


module.exports = options => ({
  plugins: [
    new OptimizeCSSAssetsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 8,
    }),
  ].concat((options.plugins && options.plugins.prod) || []).filter(Boolean),

  performance: {
    assetFilter: function (assetFilename) {
      return !/(^(favicon\.))/.test(assetFilename);
    },
  },
});
