import shell from 'shelljs'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'

import { exec, start, fail, succeed, done } from '../../../.build/utils/index.mjs'

const run = async () => {
  start('Building Angular Package')

  try {
    // Create angular package
    await exec('ng-packagr', ['-p', 'ng-package.json', '-c', './tsconfig.json'])

    // Read angular project package.json file
    const pkgPath = join(process.cwd(), 'package.json')
    let pkgJson = JSON.parse(await readFile(pkgPath))

    const ngPkgPath = join(process.cwd(), 'dist', 'package.json')
    const ngPkgJson = JSON.parse(await readFile(ngPkgPath))

    // Merge the two configs
    pkgJson = {
      ...ngPkgJson,
      ...pkgJson,
    }

    // Update package.json without exports
    await writeFile(pkgPath, JSON.stringify(pkgJson, undefined, 2) + `\n`)

    // Copy outputs
    shell.cp('-rfn', 'dist/common', '.')
    shell.cp('-rfn', 'dist/standalone', '.')
    shell.cp('-rfn', 'dist/legacy', '.')
    shell.cp('-rfn', 'dist/directives', '.')
    shell.cp('-rfn', 'dist/generated', '.')
    shell.cp('-rfn', 'dist/esm2020', '.')
    shell.cp('-rfn', 'dist/fesm2015', '.')
    shell.cp('-rfn', 'dist/fesm2020', '.')
    shell.cp('-fn', 'dist/app-initialize.d.ts', '.')
    shell.cp('-fn', 'dist/index.d.ts', '.')
    shell.cp('-fn', 'dist/module.d.ts', '.')

    // Remove distribution output folder
    shell.rm('-rf', 'dist')
  } catch (error) {
    fail('Could not build Angular Package', error)
  }

  succeed('Built Angular Package')
  done()
}

run()
