/**
 * angular - pipes
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the filters.ts file, which
 * adds the pipes to the angular framework.
 */

const path = require('path')
const file = require('../../../.scripts/file')
const { title } = require('../../../.scripts/log')
const utilities = require('../../library/.scripts/utilities')

const run = async () => {
  await title('angular : filters')
  const files = await utilities.read({ fileName: 'filters' })
  const filters = files.map(f => f.functions[0])

  const functions = filters.map(f => f.name)
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
    `import {`,
    `  ${functions.join(',\n  ')}`,
    `} from '@baloise/ui-library'`,
    '',
    utilFiltersClass.join('\n'),
    'export const FILTERS = [',
    utilFilters.join(',\n'),
    ']',
  ].join('\n')

  await file.save(path.join(__dirname, '../src/filters.ts'), content)
}

run()
