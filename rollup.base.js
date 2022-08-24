import pkg from './package.json'

import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import cleaner from 'rollup-plugin-cleaner'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import sass from 'rollup-plugin-sass'
import terser from 'rollup-plugin-terser'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

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
  * Baloise Design System
  * (c) ${new Date().getFullYear()} ${getAuthors(pkg)}
  * @license ${pkg.license}
  */`

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/',
      entryFileNames: '[name].esm.js',
      chunkFileNames: '[name]-[hash].esm.js',
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
  external: id => {
    return id.startsWith('lodash') || id.startsWith('@baloise') || id.startsWith('cypress')
  },
  plugins: [
    cleaner({ targets: ['dist/'] }),
    resolve(),
    commonjs(),
    peerDepsExternal(),
    typescript({ declaration: true, declarationDir: 'dist', outDir: 'dist' }),
    sass({
      output: 'dist/styles.css',
      options: {
        outputStyle: 'compressed',
        includePaths: [path.join(__dirname, '../../node_modules/'), 'node_modules/'],
      },
      processor: css =>
        postcss([autoprefixer])
          .process(css)
          .then(result => result.css),
    }),
    terser.terser(),
  ],
}
