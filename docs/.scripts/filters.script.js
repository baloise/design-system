const path = require('path')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const { NEWLINE } = require('../../.scripts/constants')
const utilities = require('../../packages/library/.scripts/utilities')

async function main() {
  await log.title('filters : docs')
  const files = await utilities.read({ fileName: 'filters' })
  const functions = files.map(f => f.functions[0])
  const filterDocs = functions.map(f =>
    [`## ${f.name}`, ``, `\`${f.name}${f.signature}\``, ``, f.documentation, ``].join(NEWLINE),
  )

  const content = [`# Filters`, '', ...filterDocs, ''].join(NEWLINE)
  await file.save(path.join(__dirname, '../src/guide/tooling/filters.md'), content)
}

main()
