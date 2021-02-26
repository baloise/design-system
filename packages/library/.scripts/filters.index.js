/**
 * filters - index
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the index.ts file with
 * all the types and exports.
 */

const path = require('path')
const utilities = require('./utilities')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')

const run = async () => {
  await log.title('filters : index')

  let files = await utilities.read({ fileName: 'filters' })
  files = files.map(f => f.functions[0])

  const utilExports = files.map(f => `export { ${f.name} } from './${f.name}'`)
  const utilStaticTypes = files.map(f => `  ${f.name}: ${f.signature}`)

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
