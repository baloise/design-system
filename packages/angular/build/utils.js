const fs = require('fs');

const filtersJson = require('../../utils/src/filters.json')

const utilImports = filtersJson.map(f => `import { ${f.name} } from '@baloise/ui-library-utils'`)
const utilFilters = filtersJson.map(f => `  ${f.type.replace('Static', 'Pipe')}`)
const utilFiltersClass = filtersJson.map(f => [
    '@Pipe({',
    `  name: '${f.name}'`,
    '})',
    `export class ${f.type.replace('Static', 'Pipe')} implements PipeTransform {`,
    `  transform = ${f.name}`,
    '}',
    ''
].join('\n'))


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
