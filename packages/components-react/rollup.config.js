import resolve from '@rollup/plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'

import baseConfig from '../../rollup.base'

export default {
  ...baseConfig,
  input: 'dist-transpiled/index.js',
  plugins: [resolve(), sourcemaps()],
  external: ['@baloise/design-system-components', '@baloise/design-system-components/loader', 'react', 'react-dom'],
}
