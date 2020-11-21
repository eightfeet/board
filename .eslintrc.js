// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  plugins: ['@typescript-eslint'],

  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],

  globals: {
    __DEV__: true,
  },

  env: {
    browser: true,
  },

  settings: {
    'import/resolver': {
      typescript: {},
    },
  },

  ignorePatterns: ['package.json', '**/*.d.ts'],

  rules: {
    'class-methods-use-this': 'off',

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

    'import/extensions': ['error', { ignorePackages: true }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['./tools/**/*.{js,ts}'] }],
    'import/no-named-as-default': 'off',

    'react/jsx-props-no-spreading': 'off',
    'react/static-property-placement': 'off',

    // Disable accessibility lints
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
  },

  overrides: [
    {
      files: ['src/**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['tools/**/*.ts'],
      rules: {
        'global-require': 'off',

        'import/no-dynamic-require': 'off',
        'import/no-extraneous-dependencies': 'off',

        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
