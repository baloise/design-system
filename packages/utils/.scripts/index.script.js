/**
 * utils - index
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the index.ts file with
 * all the types and exports.
 */

const path = require('path')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')
const utilsLib = require('./utils.lib')

const run = async () => {
  await log.title('utils : index')

  const filters = await utilsLib.filters()
  const utilExports = filters.map(f => `export { ${f.name} } from './filters/${f.name}'`)
  const utilStaticTypes = filters.map(f => `  ${f.name}: ${f.signature}`)

  const content = [
    '// generated file by .scripts/index.script.js',
    '',
    utilExports.join('\n'),
    '',
    'export interface BalUtilsStatic {',
    utilStaticTypes.join('\n'),
    '}',
    '',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/index.ts'), content)
}

run()
