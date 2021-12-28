import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import baseConfig from '../../rollup.base'

export default {
  ...baseConfig,
  input: 'dist-transpiled/index.js',
  external: [
    'lodash.isnil',
    '@baloise/design-system-next-components',
    '@baloise/design-system-next-components/loader',
    '@baloise/design-system-next-components/dist/components',
  ],
  plugins: [
    scss({
      processor: () => postcss([autoprefixer()]),
      outputStyle: 'compressed',
      output: 'css/design-system-table.css',
    }),
  ],
}
