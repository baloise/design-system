import baseConfig from '../../rollup.base'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  ...baseConfig,
  input: 'dist-transpiled/tokens.js',
  plugins: [nodeResolve(), commonjs(), peerDepsExternal()],
}
