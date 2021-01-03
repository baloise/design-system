const fs = require('fs')

const filtersJson = require('../../utils/src/filters.json')

const utilImports = filtersJson.map(f => `import { ${f.name} } from '@baloise/ui-library-utils'`)
const utilFilters = filtersJson.map(f => `  ${f.name.charAt(0).toUpperCase() + f.name.slice(1)}Pipe`)
const utilFiltersClass = filtersJson.map(f =>
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
  `import { Pipe, PipeTransform } from '@angular/core';`,
  utilImports.join('\n'),
  '',
  utilFiltersClass.join('\n'),
  'export const FILTERS = [',
  utilFilters.join(',\n'),
  ']',
].join('\n')

fs.writeFileSync('./src/filters.ts', content)
