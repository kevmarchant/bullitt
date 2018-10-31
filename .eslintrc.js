module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'radix': 'off',
    'no-control-regex': 'off',
    'padded-blocks': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/prefer-default-export': 'off'
  }
};