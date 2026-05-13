import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import * as jsoncParser from 'jsonc-eslint-parser'

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/eslint.config.ts', 'eslint.config.base.ts'] },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-empty-interface': 'off',
      'preserve-caught-error': 'off',
    },
  },
  prettier,
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
  },
)
