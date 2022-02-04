import pkg from './package.json'

function getAuthors(pkg) {
  const { contributors, author } = pkg

  const authors = new Set()
  if (contributors && contributors)
    contributors.forEach(contributor => {
      authors.add(contributor.name)
    })
  if (author) authors.add(author.name)

  return Array.from(authors).join(', ')
}

const banner = `/*!
  * ${pkg.name} v${pkg.version}
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
