/**
 * utils - index
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the index.ts file with
 * all the types and exports.
 */

const file = require('../../../.scripts/file')
const { title, log } = require('../../../.scripts/log')
const { uncapitalize, convertToDotCase } = require('../../../.scripts/string')

const run = async () => {
  await title('testing : index')

  let mixins = []
  try {
    const fileContentMixins = await file.read('./src/mixins.json')
    mixins = JSON.parse(fileContentMixins)
    log.info(`Read ${mixins.length} mixins`)
  } catch (error) {
    log.error('Could not read file ./src/mixins.json. Maybe run `npm run testing:build` first.', error)
  }

  let accessors = []
  try {
    const fileContentAccessors = await file.read('./src/accessors.json')
    accessors = JSON.parse(fileContentAccessors)
    log.info(`Read ${accessors.length} accessors`).break()
  } catch (error) {
    log.error('Could not read file ./src/accessors.json. Maybe run `npm run build:docs` first.', error)
  }

  // const utilExports = filters.map(f => `export { ${f.name} } from './filters/${f.name}'`)
  // const utilStaticTypes = filters.map(f => `  ${f.name}: ${f.signature}`)

  const mixinsExports = mixins.map(m => `export * from './mixins/${uncapitalize(m.name)}'`)
  const accessorsExports = accessors.map(a => `export * from './accessors/${convertToDotCase(a.name)}'`)

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

  try {
    await file.write('./src/index.ts', content)
    log.break().success('Successfully updated `src/index.ts`')
  } catch (error) {
    log.error('Could not update `src/index.ts`', error)
  }
}

run()
