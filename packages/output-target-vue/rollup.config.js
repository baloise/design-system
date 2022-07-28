import baseConfig from '../../rollup.base'

export default {
  ...baseConfig,
  external: ['path', 'fs', 'util'],
}
