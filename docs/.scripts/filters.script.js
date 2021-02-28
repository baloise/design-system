/**
 * filters - docs
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the documentation markdown file.
 */

const path = require('path')
const utilities = require('../../packages/library/.scripts/utilities')
const { NEWLINE, GENERATED_TAG } = require('./utils/constants')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')

const run = async () => {
  await log.title('filters : docs')
  const files = await utilities.read({ fileName: 'filters' })
  const functions = files.map(f => f.functions[0])

  const filterDocs = functions.map(f =>
    [`## ${f.name}`, ``, `\`${f.name}${f.signature}\``, ``, f.documentation, ``].join(NEWLINE),
  )

  const content = [GENERATED_TAG, `# Filters`, '', ...filterDocs, ''].join(NEWLINE)
  await file.save(path.join(__dirname, '../utilities/filters.md'), content)
}

run()
