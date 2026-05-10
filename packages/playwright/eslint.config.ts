import tseslint from 'typescript-eslint'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(
  { ignores: ['generated/**', 'playwright-report/**'] },
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
    rules: {},
  },
)
