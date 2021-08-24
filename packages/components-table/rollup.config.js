import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

export default {
  input: 'dist-transpiled/index.js',
  output: [
    {
      dir: 'dist/',
      entryFileNames: '[name].esm.js',
      chunkFileNames: '[name]-[hash].esm.js',
      format: 'es',
      sourcemap: true,
    },
    {
      dir: 'dist/',
      format: 'commonjs',
      preferConst: true,
      sourcemap: true,
    },
  ],
  external: [
    'lodash',
    '@baloise/design-system-components',
    '@baloise/design-system-components/loader',
    '@baloise/design-system-components/dist/custom-elements',
  ],
  plugins: [
    scss({
      processor: () => postcss([autoprefixer()]),
      outputStyle: 'compressed',
      output: 'css/design-system-table.css',
    }),
  ],
}
