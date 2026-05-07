import tseslint from 'typescript-eslint'
import nxPlugin from '@nx/eslint-plugin'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from './eslint.config.base'

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.nx/**',
      '**/www/**',
      '**/.worktrees/**',
      'test/**',
      '**/playwright-report/**',
      'CLAUDE.md',
      'docs/superpowers/**',
    ],
  },
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@nx/enforce-module-boundaries': 'off',
      'playwright/no-skipped-test': 'off',
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
    rules: {},
  },
  {
    files: ['package.json', 'executors.json'],
    plugins: { '@nx': nxPlugin },
    languageOptions: { parser: jsoncParser },
    rules: { '@nx/nx-plugin-checks': 'error' },
  },
)
