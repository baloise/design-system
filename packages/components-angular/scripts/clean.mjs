import shell from 'shelljs'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'

import { start, fail, succeed, done } from '../../../scripts/utils.mjs'

const run = async () => {
  start('Cleaning Angular Package')

  try {
    // Remove distribution output folder
    shell.rm('-rf', 'dist')

    shell.rm('-rf', 'common/**/*.d.ts')
    shell.rm('-rf', 'standalone/**/*.d.ts')
    shell.rm('-rf', 'legacy/**/*.d.ts')

    shell.rm('-rf', 'common/directives')
    shell.rm('-rf', 'common/providers')
    shell.rm('-rf', 'common/utils')

    shell.rm('-rf', 'standalone/components')
    shell.rm('-rf', 'standalone/directives')
    shell.rm('-rf', 'standalone/generated')

    shell.rm('-rf', 'legacy/directives')
    shell.rm('-rf', 'legacy/generated')

    shell.rm('-rf', 'directives')
    shell.rm('-rf', 'esm2020')
    shell.rm('-rf', 'fesm2015')
    shell.rm('-rf', 'fesm2020')
    shell.rm('-rf', 'generated')
    shell.rm('-f', 'app-initialize.d.ts')
    shell.rm('-f', 'index.d.ts')
    shell.rm('-f', 'module.d.ts')

    // Read project package.json file
    const pkgPath = join(process.cwd(), 'package.json')
    let pkgJson = JSON.parse(await readFile(pkgPath))

    // Remove exports for webpack to make angular build running without errors
    delete pkgJson.exports

    // Update package.json without exports
    await writeFile(pkgPath, JSON.stringify(pkgJson, undefined, 2))
  } catch (error) {
    fail('Could not clean package', error)
  }

  succeed('Cleaned Angular Package')
  done()
}

run()
