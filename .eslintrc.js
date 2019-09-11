module.exports = {
  extends: require.resolve('./xc-front-lint/src/base'),
  rules: {
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'object-shorthand': 'off'
  }
};
