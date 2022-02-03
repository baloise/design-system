import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  input: 'dist-transpiled/index.js',
  output: [
    {
      dir: 'dist/',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      format: 'es',
      sourcemap: true,
    },
    {
      dir: 'dist/',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external: id => {
    return id.startsWith('vue') || id.startsWith('@baloise')
  },
  plugins: [peerDepsExternal()],
}
