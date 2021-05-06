/**
 * vue - filters
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the filters.ts file, which
 * adds the filter to the vue framework.
 */

const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')
const utilities = require('../../library/.scripts/utilities')

const run = async () => {
  await log.title('vue : filters')
  const files = await utilities.read({ fileName: 'filters' })
  const filters = files.map(f => f.functions[0])
  const functions = filters.map(f => `  ${f.name}`)

  const utilFilters = filters.map(f => `  _Vue.filter('${f.name}', ${f.name})`)

  const content = [
    '// generated file by .scripts/filters.script.js',
    '',
    `import { PluginFunction } from 'vue'`,
    `import {`,
    functions.join(',\n'),
    `} from '@baloise/ui-library'`,
    '',
    'export const addFilters: PluginFunction<any> = (_Vue): void => {',
    utilFilters.join('\n'),
    '}',
    '',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/generated/filters.ts'), content)
}

run()
