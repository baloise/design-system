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
const { uncapitalize, convertToDotCase } = require('../../../.scripts/string')
const testingLib = require('./testing.lib')

const run = async () => {
  await log.title('testing : index')

  const mixins = await testingLib.mixins()
  const accessors = await testingLib.accessors()

  const mixinsExports = mixins.map(m => `export * from './mixins/${uncapitalize(m.name)}'`)
  const accessorsExports = Array.from(accessors, ([name, value]) => value).map(
    a => `export * from './accessors/${convertToDotCase(a.name)}'`,
  )

  const content = [
    '// generated file by .scripts/index.script.js',
    '',
    `export * from './selectors'`,
    `export * from './mixins/mixins'`,
    '',
    mixinsExports.join('\n'),
    '',
    accessorsExports.join('\n'),
    '',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/index.ts'), content)
}

run()
