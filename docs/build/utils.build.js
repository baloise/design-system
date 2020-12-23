const { banner, printSuccess } = require('./utils/log.util')
const { writeFile } = require('./utils/file.util')

banner('Starting Utils Documents')

const filtersJson = require('../../packages/utils/src/filters.json')

const filters = filtersJson.map(f =>
  [`## ${f.name}`, '', f.descripton, '', '#### Signature', '', `\`${f.signature}\``, ''].join('\n'),
)

const content = [`# Filters`, '', filters, ''].join('\n')

writeFile('./utilities/filters.md', content)
printSuccess('Filter are documented')
