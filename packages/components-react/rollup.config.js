import resolve from '@rollup/plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
  input: 'dist-transpiled/index',
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
  plugins: [resolve(), sourcemaps()],
  external: [
    '@baloise/design-system-components',
    '@baloise/design-system-components/loader',
    '@baloise/design-system-components/dist/custom-elements',
    'react',
    'react-dom',
  ],
}
