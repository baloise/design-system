import pkg from './package.json'
import lerna from './lerna.json'

function getAuthors(pkg) {
  const { contributors } = pkg

  const authors = new Set()
  if (contributors && contributors)
    contributors.forEach(contributor => {
      const cs = contributor.split(' ')
      cs.pop()
      cs.pop()
      authors.add(cs.join(' '))
    })

  return Array.from(authors).join(', ')
}

const banner = `/*!
  * Baloise Design System v${lerna.version}
  * (c) ${new Date().getFullYear()} ${getAuthors(pkg)}
  * @license ${pkg.license}
  */`

export default {
  input: 'dist-transpiled/index.js',
  output: [
    {
      dir: 'dist/',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      format: 'es',
      banner,
      sourcemap: true,
    },
    {
      dir: 'dist/',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      format: 'cjs',
      banner,
      sourcemap: true,
    },
  ],
}
