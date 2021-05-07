/**
 * utils - index
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the index.ts file with
 * all the types and exports.
 */

const path = require('path')
const _ = require('lodash')
const utilities = require('./utilities')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')

const run = async () => {
  await log.title('utils : index')
  const files = await utilities.read({ fileName: 'utils' })
  const utilExports = files.map(f => {
    const imp = _.uniq([...f.interfaces, ...f.functions.map(fn => fn.name)])
    return `export { ${imp.join(', ')} } from './${f.fileName}'`
  })

  const content = ['// generated file by .scripts/utils.index.js', '', utilExports.join('\n'), ''].join('\n')
  await file.save(path.join(__dirname, '../src/utils/index.ts'), content)
}

run()
