/**
 * angular - pipes
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the filters.ts file, which
 * adds the pipes to the angular framework.
 */

const path = require('path')
const file = require('../../../.scripts/file')
const { title, log } = require('../../../.scripts/log')
const utilsLib = require('../../utils/.scripts/utils.lib')

const run = async () => {
  await title('angular : filters')

  const filters = await utilsLib.filters()

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

  await file.save(path.join(__dirname, '../src/filters.ts'), content)
}

run()
