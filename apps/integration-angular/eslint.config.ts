import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.base'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  ...baseConfig,
  { ignores: ['dist', '.angular'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
)
