import tseslint from 'typescript-eslint'
import playwright from 'eslint-plugin-playwright'
import baseConfig from '../../eslint.config.base'
import dsPlugin from '@baloise/ds-eslint-plugin'

export default tseslint.config(
  { ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*', 'loader/**', 'components/**', 'www/**', 'playwright-report/**'] },
  ...baseConfig,
  {
    files: ['**/*.play.ts'],
    extends: [playwright.configs['flat/recommended']],
    rules: {
      'playwright/expect-expect': 'off',
      'playwright/valid-title': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@nx/enforce-module-boundaries': 'off',
      'no-extra-boolean-cast': 'off',
      'no-self-assign': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    plugins: { '@baloise/ds': dsPlugin },
    rules: {
      '@typescript-eslint/no-inferrable-types': ['error', { ignoreProperties: true }],
      '@baloise/ds/no-relative-imports': 'error',
      '@baloise/ds/prop-readonly': 'error',
      '@baloise/ds/prop-type-annotation': 'error',
      '@baloise/ds/listen-naming': 'error',
      '@baloise/ds/watch-naming': 'error',
      '@baloise/ds/handler-naming': 'warn',
      '@baloise/ds/event-prefix': 'error',
      '@baloise/ds/method-async': 'error',
      '@baloise/ds/method-private': 'warn',
      '@baloise/ds/component-tag-prefix': 'error',
    },
  },
)
