import baseConfig from '../../rollup.base'

export default {
  ...baseConfig,
  input: 'dist-transpiled/index.js',
  external: [
    '@baloise/design-system-components',
    '@baloise/design-system-components/loader',
    '@baloise/design-system-components/dist/custom-elements',
    'vue',
  ],
}
