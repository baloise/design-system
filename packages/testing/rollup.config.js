import baseConfig from '../../rollup.base'

export default {
  ...baseConfig,
  input: 'dist-transpiled/index.js',
  external: ['@baloise/design-system-components', '@baloise/web-app-utils', 'cypress-file-upload'],
}
