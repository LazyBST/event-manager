const path = require('path')

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'no-console': 1,
    'prettier/prettier': 2,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/lines-between-class-members': 2,
    '@typescript-eslint/naming-convention': 2,
    '@typescript-eslint/no-unused-vars': [
      'warn', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
  },
}
