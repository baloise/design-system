import nxPlugin from '@nx/eslint-plugin'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import * as jsoncParser from 'jsonc-eslint-parser'

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/eslint.config.ts', 'eslint.config.base.ts'] },
  ...nxPlugin.configs['flat/base'],
  ...nxPlugin.configs['flat/typescript'],
  ...nxPlugin.configs['flat/javascript'],
  {
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [{ sourceTag: '*', onlyDependOnLibsWithTags: ['*'] }],
        },
      ],
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
