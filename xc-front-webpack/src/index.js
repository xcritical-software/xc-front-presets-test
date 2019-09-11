const merge = require('webpack-merge');
const commonConfig = require('./configs/webpack.common');
const helper = require('./helper');


function configCreator(options) {
  if (options.mode === 'storybook') {
    const storyBookConfig = require('./configs/webpack.storybook.js');
    return storyBookConfig(options);
  }

  const mode = helper.env.isDevMode ? 'dev' : 'prod';
  const envConfig = require(`./configs/webpack.${mode}.js`);

  return merge.smart(commonConfig(options), envConfig(options));
}

module.exports = {
  configCreator,
  env: helper.env,
  paths: helper.paths,
  loaders: helper.loaders,
};
