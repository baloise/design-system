import tseslint from 'typescript-eslint'
import nxPlugin from '@nx/eslint-plugin'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from '../eslint.config.base'

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@nx/enforce-module-boundaries': 'off',
      'no-empty-pattern': 'off',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { '@nx': nxPlugin },
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredDependencies: [
            '@baloise/ds-assets',
            '@baloise/ds-tokens',
            'react',
            'react-dom',
            'js-beautify',
            'storybook',
            '@storybook/manager-api',
            '@storybook/html-vite',
            '@storybook/addon-essentials',
            '@storybook/addons',
            '@storybook/core-events',
            '@storybook/components',
            '@storybook/theming',
            '@storybook/addon-docs',
            '@storybook/global',
          ],
        },
      ],
    },
  },
)
