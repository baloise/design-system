import scss from 'rollup-plugin-scss'
import baseConfig from '../../rollup.base'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  ...baseConfig,
  external: id => {
    return id.startsWith('lodash') || id.startsWith('@baloise')
  },
  plugins: [
    scss({
      processor: () => postcss([autoprefixer()]),
      outputStyle: 'compressed',
      output: 'css/design-system-table.css',
    }),
    nodeResolve(),
    commonjs(),
    peerDepsExternal(),
  ],
}
