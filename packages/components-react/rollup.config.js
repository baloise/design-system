import baseConfig from '../../rollup.base'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
  ...baseConfig,
  external: id => {
    return id.startsWith('react') || id.startsWith('@baloise')
  },
  plugins: [nodeResolve(), commonjs(), peerDepsExternal(), sourcemaps()],
}
