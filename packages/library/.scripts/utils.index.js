/**
 * utils - index
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the index.ts file with
 * all the types and exports.
 */

const path = require('path')
const utilities = require('./utilities')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const run = async () => {
  await log.title('utils : index')
  const files = await utilities.read({ fileName: 'utils' })
  const utilExports = files.map(f => `export * as ${capitalize(f.fileName)} from './${f.fileName}'`)
  const content = ['// generated file by .scripts/utils.index.js', '', utilExports.join('\n'), ''].join('\n')
  await file.save(path.join(__dirname, '../src/utils/index.ts'), content)
}

run()
