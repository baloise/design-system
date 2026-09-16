import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(
  ...baseConfig,
  { ignores: ['src/generated/**'] },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
)
