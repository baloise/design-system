/**
 * filters - index
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the index.ts file with
 * all the types and exports.
 */

const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')
const filtersLib = require('./filters.lib')

const run = async () => {
  await log.title('filters : index')

  const filters = await filtersLib.filters()
  const utilExports = filters.map(f => `export { ${f.name} } from './${f.name}'`)
  const utilStaticTypes = filters.map(f => `  ${f.name}: ${f.signature}`)

  const content = [
    '// generated file by .scripts/filters.index.js',
    '',
    utilExports.join('\n'),
    '',
    'export interface BalFiltersStatic {',
    utilStaticTypes.join('\n'),
    '}',
    '',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/filters/index.ts'), content)
}

run()
