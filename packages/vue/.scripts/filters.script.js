/**
 * vue - filters
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the filters.ts file, which
 * adds the filter to the vue framework.
 */

const file = require('../../../.scripts/file')
const { title, log } = require('../../../.scripts/log')

const run = async () => {
  await title('vue : filters')

  let filters = []
  const pathToFiltersJson = '../utils/src/filters.json'
  try {
    const fileContent = await file.read(pathToFiltersJson)
    filters = JSON.parse(fileContent)
    log.info(`Read ${filters.length} filters`).break()
  } catch (error) {
    log.error(`Could not read file ${pathToFiltersJson}. Maybe run 'npm run utils:build' first.`, error)
  }

  const utilImports = filters.map(f => `import { ${f.name} } from '@baloise/ui-library-utils'`)
  const utilFilters = filters.map(f => `  _Vue.filter('${f.name}', ${f.name})`)

  const content = [
    '// generated file by .scripts/filters.script.js',
    '',
    `import { PluginFunction } from 'vue'`,
    utilImports.join('\n'),
    '',
    'export const addFilters: PluginFunction<any> = (_Vue): void => {',
    utilFilters.join('\n'),
    '}',
    '',
  ].join('\n')

  const pathToFilters = './src/filters.ts'
  try {
    await file.write(pathToFilters, content)
    log.success(`Successfully updated ${pathToFilters}`)
  } catch (error) {
    log.error(`Could not update ${pathToFilters}`, error)
  }
}

run()
