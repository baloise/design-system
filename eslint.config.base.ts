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
      // Catch unused variables and imports. Prefix with _ to intentionally ignore.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  prettier,
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
  },
)
