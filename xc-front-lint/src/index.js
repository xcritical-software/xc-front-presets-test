/**
 * @fileoverview xc-front-lint
 * @author 123Software
 */

module.exports = {
  configs: {
    base: {
      extends: require.resolve('./base'),
    },
    prettier: {
      extends: require.resolve('./prettier'),
    },
    mixin: {
      extends: require.resolve('./mixin'),
    },
    typescript: {
      extends: require.resolve('./typescript'),
    },
  },
};
