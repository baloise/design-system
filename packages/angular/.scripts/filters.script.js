/**
 * angular - pipes
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the filters.ts file, which
 * adds the pipes to the angular framework.
 */

const file = require('../../../.scripts/file')
const { title, log } = require('../../../.scripts/log')

const run = async () => {
  await title('angular : filters')

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
  const utilFilters = filters.map(f => `  ${f.name.charAt(0).toUpperCase() + f.name.slice(1)}Pipe`)
  const utilFiltersClass = filters.map(f =>
    [
      '@Pipe({',
      `  name: '${f.name}'`,
      '})',
      `export class ${f.name.charAt(0).toUpperCase() + f.name.slice(1)}Pipe implements PipeTransform {`,
      `  transform = ${f.name}`,
      '}',
      '',
    ].join('\n'),
  )

  const content = [
    '// generated file by .scripts/filters.script.js',
    '',
    `import { Pipe, PipeTransform } from '@angular/core';`,
    utilImports.join('\n'),
    '',
    utilFiltersClass.join('\n'),
    'export const FILTERS = [',
    utilFilters.join(',\n'),
    ']',
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
