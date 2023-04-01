module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'import/prefer-default-export': 0,
        'import/no-mutable-exports': 0,
      },
    },
    {
      files: ['./src/routes/**/*.ts'],
      rules: {
        'import/prefer-default-export': 0,
        'import/no-mutable-exports': 0,
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.cjs', '.js', '.ts'],
    },
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          $lib: './src/lib',
          $app: './.svelte-kit/runtime/app',
          '@sveltejs': './.svelte-kit/dev',
        },
        extensions: ['.ts'],
      },
      typescript: {
        alwaystrytypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
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
    'import/extensions': 0,
  },
};
