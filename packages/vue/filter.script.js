const fs = require('fs');

const filtersJson = require('../utils/src/filters.json')

const utilImports = filtersJson.map(f => `import { ${f.name} } from '@baloise/ui-library-utils'`)
const utilFilters = filtersJson.map(f => `  _Vue.filter('${f.name}', ${f.name})`)

const content = [
    `import { PluginFunction } from 'vue'`,
    utilImports.join('\n'),
    '',
    'export const addFilters: PluginFunction<any> = (_Vue): void => {',
    utilFilters.join('\n'),
    '}',
    ''
].join('\n')

fs.writeFileSync('./src/filters.ts', content)
