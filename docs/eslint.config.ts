import tseslint from 'typescript-eslint'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from '../eslint.config.base'

export default tseslint.config(
  { ignores: ['public/**', 'src/assets/**'] },
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-empty-pattern': 'off',
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
    rules: {},
  },
)
