import resolve from '@rollup/plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'

import baseConfig from '../../rollup.base'

export default {
  ...baseConfig,
  input: 'dist-transpiled/index.js',
  plugins: [resolve(), sourcemaps()],
  external: [
    '@baloise/design-system-components',
    '@baloise/design-system-components/loader',
    '@baloise/design-system-components/dist/custom-elements',
    'react',
    'react-dom',
  ],
}
