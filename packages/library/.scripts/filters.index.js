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
  const files = await utilities.read({ fileName: 'filters' })
  const utilExports = files.map(filter => {
    const names = filter.functions.map(f => f.name)
    ex = [...names, ...filter.interfaces]
    return `export { ${ex.join(', ')} } from './${filter.functions[0].name}'`
  })
  const utilImports = files
    .map(filter => {
      if (filter.interfaces.length === 0) {
        return undefined
      }
      return `import { ${filter.interfaces.join(', ')} } from './${filter.functions[0].name}'`
    })
    .filter(f => !!f)
  const firstFunctions = files.map(f => f.functions[0])
  const utilStaticTypes = firstFunctions.map(f => `  ${f.name}: ${f.signature}`)

  const content = [
    '// generated file by .scripts/filters.index.js',
    '',
    utilImports.join('\n'),
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
