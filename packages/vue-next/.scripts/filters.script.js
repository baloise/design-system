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
const utilsLib = require('../../utils/.scripts/utils.lib')

const run = async () => {
  await log.title('vue : filters')

  const filters = await utilsLib.filters()

  const utilImports = filters.map(f => `import { ${f.name} } from '@baloise/ui-library-utils'`)
  const utilFilters = filters.map(f => `  _Vue.filter('${f.name}', ${f.name})`)

  const content = [
    '// generated file by .scripts/filters.script.js',
    '',
    `import { PluginFunction } from 'vue'`,
    utilImports.join('\n'),
    '',
    'export const balFilters: PluginFunction<any> = (_Vue): void => {',
    utilFilters.join('\n'),
    '}',
    '',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/filters.ts'), content)
}

run()
