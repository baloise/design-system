import shell from 'shelljs'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'

import { exec, start, fail, succeed, done } from '../../.build/utils/index.mjs'

const run = async () => {
  start('Building Angular Package')

  try {
    // Remove distribution output folder
    shell.rm('-rf', 'dist')

    // Read project package.json file
    const pkgPath = join(process.cwd(), 'package.json')
    let pkgJson = JSON.parse(await readFile(pkgPath))

    // Remove exports for webpack to make angular build running without errors
    delete pkgJson.module
    delete pkgJson.esm2020
    delete pkgJson.fesm2015
    delete pkgJson.fesm2020
    delete pkgJson.typings
    delete pkgJson.sideEffects
    delete pkgJson.es2020
    delete pkgJson.exports

    // Update package.json without exports
    await writeFile(pkgPath, JSON.stringify(pkgJson, undefined, 2))

    // Create angular package
    await exec('npm', ['run', 'ng:package'])

    // Read angular project package.json file
    const ngPkgPath = join(process.cwd(), 'dist', 'package.json')
    const ngPkgJson = JSON.parse(await readFile(ngPkgPath))

    // Merge the two configs
    pkgJson = {
      ...ngPkgJson,
      ...pkgJson,
    }

    // Adjust the path to dist
    pkgJson.module = `dist/${pkgJson.module}`
    pkgJson.esm2020 = `dist/${pkgJson.esm2020}`
    pkgJson.fesm2015 = `dist/${pkgJson.fesm2015}`
    pkgJson.fesm2020 = `dist/${pkgJson.fesm2020}`
    pkgJson.typings = `dist/${pkgJson.typings}`
    pkgJson.es2020 = `dist/${pkgJson.es2020}`

    pkgJson.exports['.'].types = pkgJson.exports['.'].types.replace('./', './dist/')
    pkgJson.exports['.'].esm2020 = pkgJson.exports['.'].esm2020.replace('./', './dist/')
    pkgJson.exports['.'].es2020 = pkgJson.exports['.'].es2020.replace('./', './dist/')
    pkgJson.exports['.'].es2015 = pkgJson.exports['.'].es2015.replace('./', './dist/')
    pkgJson.exports['.'].node = pkgJson.exports['.'].node.replace('./', './dist/')
    pkgJson.exports['.'].default = pkgJson.exports['.'].default.replace('./', './dist/')

    pkgJson.exports['./common'].types = pkgJson.exports['./common'].types.replace('./', './dist/')
    pkgJson.exports['./common'].esm2020 = pkgJson.exports['./common'].esm2020.replace('./', './dist/')
    pkgJson.exports['./common'].es2020 = pkgJson.exports['./common'].es2020.replace('./', './dist/')
    pkgJson.exports['./common'].es2015 = pkgJson.exports['./common'].es2015.replace('./', './dist/')
    pkgJson.exports['./common'].node = pkgJson.exports['./common'].node.replace('./', './dist/')
    pkgJson.exports['./common'].default = pkgJson.exports['./common'].default.replace('./', './dist/')

    pkgJson.exports['./legacy'].types = pkgJson.exports['./legacy'].types.replace('./', './dist/')
    pkgJson.exports['./legacy'].esm2020 = pkgJson.exports['./legacy'].esm2020.replace('./', './dist/')
    pkgJson.exports['./legacy'].es2020 = pkgJson.exports['./legacy'].es2020.replace('./', './dist/')
    pkgJson.exports['./legacy'].es2015 = pkgJson.exports['./legacy'].es2015.replace('./', './dist/')
    pkgJson.exports['./legacy'].node = pkgJson.exports['./legacy'].node.replace('./', './dist/')
    pkgJson.exports['./legacy'].default = pkgJson.exports['./legacy'].default.replace('./', './dist/')

    // Update package.json without exports
    await writeFile(pkgPath, JSON.stringify(pkgJson, undefined, 2) + `\n`)

    // Clean generated dist folder
    shell.rm([
      // join(process.cwd(), 'dist', 'package.json'),
      join(process.cwd(), 'dist', 'LICENSE'),
      join(process.cwd(), 'dist', 'README.md'),
    ])
  } catch (error) {
    fail('Could not build Angular Package', error)
  }

  succeed('Built Angular Package')
  done()
}

run()
