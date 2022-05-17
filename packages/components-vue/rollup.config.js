import baseConfig from '../../rollup.base'

export default {
  ...baseConfig,
  external: id => {
    return id.startsWith('vue') || id.startsWith('@baloise')
  },
}
