import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(...baseConfig, {
  files: ['**/*.ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
})
