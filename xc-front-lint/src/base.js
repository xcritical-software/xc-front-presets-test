module.exports = {
  extends: ['airbnb'],
  plugins: ['chai-friendly', 'jsdoc', 'react-hooks'],
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
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      groups: [
        ['builtin', 'external', 'internal'],
      ],
    }],
    'newlines-between': 'always',
    'import/newline-after-import': ['error', {
      count: 2,
    }],
    'import/no-cycle': 'warn',
    'chai-friendly/no-unused-expressions': 'error',
    'default-case': 'off',
    'jsdoc/newline-after-description': 'error',
    'jsx-quotes': ['error', 'prefer-double'],
    'no-param-reassign': 'warn',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'prefer-const': 'warn',
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'always',
        children: true,
      },
    ],
    'react/button-has-type': 'warn',
    'react/prop-types': [
      'error',
      {
        ignore: ['children', 'theme', 'className', 'style', 'size', 'color', 'round', 'disabled'],
      },
    ],
    'react/no-unused-prop-types': 'warn',
    'react/require-default-props': 'warn',
    'react/forbid-prop-types': 'off',
    'react/sort-comp': 'warn',
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
