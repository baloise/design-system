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

  const utils = await utilsLib.utils()
  const utilExports = utils.map(u => `export * as ${u.name} from './${u.name}'`)

  const content = [
    '// generated file by .scripts/utils.index.js',
    '',
    utilExports.join('\n'),
    '',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/utils/index.ts'), content)
}

run()
