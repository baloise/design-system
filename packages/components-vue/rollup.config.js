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
  ],
  external: id => {
    if (/@baloise/.test(id)) {
      return true
    }

    if (/vue/.test(id)) {
      return true
    }

    return false
  },
}
