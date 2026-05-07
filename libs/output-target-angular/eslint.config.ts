import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(
  { ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*', 'angular-component-lib/**', 'resources/**'] },
  ...baseConfig,
)
