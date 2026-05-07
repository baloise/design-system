import tseslint from 'typescript-eslint'
import nxPlugin from '@nx/eslint-plugin'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(
  { ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'] },
  ...baseConfig,
  {
    files: ['**/*.json'],
    plugins: { '@nx': nxPlugin },
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredDependencies: ['@nx/devkit', '@nx/vite', 'vite', 'util', 'archiver'],
        },
      ],
    },
  },
  {
    files: ['package.json', 'executors.json'],
    plugins: { '@nx': nxPlugin },
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/nx-plugin-checks': 'error',
    },
  },
)
