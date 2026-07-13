import tseslint from 'typescript-eslint'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from './eslint.config.base'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
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
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
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
    languageOptions: { parser: jsoncParser },
    rules: {},
  },
)
