/**
 * angular - pipes
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the filters.ts file, which
 * adds the pipes to the angular framework.
 */

const path = require('path')
const file = require('../../../.scripts/file')
const { title, log } = require('../../../.scripts/log')
const filtersLib = require('../../library/.scripts/filters.lib')

const run = async () => {
  await title('vue : filters')

  const filters = await filtersLib.filters()

  const functions = filters.map(f => `  ${f.name}`)

  const functionsGlobal = filters.map(f => `  app.config.globalProperties.$${f.name} = ${f.name}`)
  const functionsProvide = filters.map(f => `  app.provide<typeof ${f.name}>('${f.name}', ${f.name})`)
  const functionsUse = filters.map(f => `export const use${f.name.replace('bal', 'Bal')} = (): typeof ${f.name} => inject<typeof ${f.name}>('${f.name}', ${f.name})`)

  const content = [
    '// generated file by .scripts/filters.script.js',
    '',
    `import { App, inject } from 'vue'`,
    `import {`,
    functions.join(',\n'),
    `} from '@baloise/ui-library'`,
    '',
    'export const applyFilters = (app: App) => {',
    functionsGlobal.join('\n'),
    '',
    functionsProvide.join('\n'),
    '}',
    '',
    functionsUse.join('\n'),
    '',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/filters.ts'), content)
}

run()
