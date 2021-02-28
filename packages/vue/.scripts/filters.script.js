/**
 * vue - filters
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the filters.ts file, which
 * adds the filters to the vue framework.
 */

const path = require('path')
const file = require('../../../.scripts/file')
const { title } = require('../../../.scripts/log')
const utilities = require('../../library/.scripts/utilities')

const run = async () => {
  await title('vue : filters')
  const files = await utilities.read({ fileName: 'filters' })
  const filters = files.map(f => f.functions[0])
  const functions = filters.map(f => `  ${f.name}`)
  const functionsGlobal = filters.map(f => `  app.config.globalProperties.$${f.name} = ${f.name}`)
  const content = [
    '// generated file by .scripts/filters.script.js',
    '',
    `import { App } from 'vue'`,
    `import {`,
    functions.join(',\n'),
    `} from '@baloise/ui-library'`,
    '',
    'export const applyFilters = (app: App) => {',
    functionsGlobal.join('\n'),
    '',
    '}',
    '',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/filters.ts'), content)
}

run()
