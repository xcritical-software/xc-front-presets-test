module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/babel',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['chai-friendly', 'jsdoc', 'react-hooks', 'babel', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    benchmark: true,
    expect: true,
    React: true,
    suite: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        jsxSingleQuote: false,
        printWidth: 100,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
        endOfLine: 'lf',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'chai-friendly/no-unused-expressions': 'error',
    'default-case': 'off',
    'func-names': 'off',
    'function-paren-newline': 'off',
    'jsdoc/newline-after-description': 'error',
    'no-param-reassign': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-shadow': 'off',
    'no-unused-expressions': 'error',
    'prefer-arrow-callback': 'off',
    'prefer-const': 'warn',
    'react/jsx-filename-extension': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/button-has-type': 'off',
    'react/prop-types': [
      'error',
      {
        ignore: ['children', 'theme', 'className', 'style', 'size', 'color', 'round', 'disabled'],
      },
    ],
    'react/no-unused-prop-types': 'warn',
    'react/prefer-stateless-function': 'error',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/sort-comp': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['invalidHref'],
      },
    ],
    'valid-jsdoc': [
      'error',
      {
        matchDescription: '(.+\\.)|^$',
        prefer: {
          return: 'returns',
        },
        preferType: {
          boolean: 'Boolean',
          number: 'Number',
          object: 'Object',
          string: 'String',
        },
        requireReturn: false,
        requireReturnDescription: false,
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
  },
};
