const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const xcFrontBabel = require('@xcritical/xc-front-babel');
const paths = require('./paths');
const env = require('./env');


function filter(i) {
  return Boolean(i.length);
}

function getEnvPlugins(babelOptions) {
  if (babelOptions && babelOptions.env && babelOptions.env[env.getMode]) {
    return babelOptions.env[env.getMode].plugins;
  }

  return [];
}

function getBabelOptions(options) {
  const babelMainOptions = xcFrontBabel({
    isDevMode: env.isDevMode,
    isBabelDebug: options.isBabelDebug,
  });
  const babelProjectOptions = paths.babelrc || [];
  const projectPresets = babelProjectOptions.presets || [];
  const projectPlugins = babelProjectOptions.plugins || [];
  const projectEnvPlugins = getEnvPlugins(babelProjectOptions);

  return {
    babelrc: false,
    cacheDirectory: env.isDevMode,
    presets: babelMainOptions.presets.concat(projectPresets).filter(filter),
    plugins: babelMainOptions.plugins.concat(projectPlugins, projectEnvPlugins).filter(filter),
  };
}

function generateStyleLoaders(cssOptions, preProcessor) {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: cssOptions.importLoaders,
        sourceMap: env.isNeedSourceMaps,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: function plugins() {
          return [
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            require('postcss-flexbugs-fixes'),
          ];
        },
        sourceMap: env.isNeedSourceMaps,
      },
    },
  ];

  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: env.isNeedSourceMaps,
      },
    });
  }

  return loaders;
}

module.exports = {
  getBabelOptions,
  generateStyleLoaders,
};
