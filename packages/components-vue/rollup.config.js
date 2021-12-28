import baseConfig from '../../rollup.base'

export default {
  ...baseConfig,
  input: 'dist-transpiled/index.js',
  external: ['@baloise/design-system-next-components', '@baloise/design-system-next-components/loader', 'vue'],
}
