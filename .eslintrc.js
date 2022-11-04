module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    'cypress/globals': true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },

  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'prettier', 'cypress'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'react-app',
    'react-app/jest',
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '**/*.json',
  ],
  rules: {
    'no-use-before-define': ['error', { variables: false }],
    quotes: ['error', 'single'],
    'no-prototype-builtins': ['warn'],
    '@typescript-eslint/ban-ts-comment': ['warn'],
    'valid-jsdoc': ['warn'],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        printWidth: 80,
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
        },
      },
    ],
    'no-console': ['error'],
    'no-unused-vars': ['error'],

    // Typescript rules
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],

    // Unneeded rules
    'require-jsdoc': 0,
    'jsx-a11y/role-supports-aria-props': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/no-named-as-default': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
