module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['*.cjs', '/*.js', '/*.ts'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'import/no-mutable-exports': 0,
        'import/prefer-default-export': 0,
      },
    },
    {
      files: ['./src/routes/**/*.ts'],
      rules: {
        'import/prefer-default-export': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          $app: './node_modules/@sveltejs/kit/src/runtime/app',
          $lib: './src/lib',
        },
        extensions: ['.ts', '.js'],
      },
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: './tsconfig.json',
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
  },
};
