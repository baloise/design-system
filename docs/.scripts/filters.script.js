const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const filterLib = require('../../packages/library/.scripts/filters.lib')
const path = require('path')
const { NEWLINE, GENERATED_TAG } = require('./utils/constants')

const run = async () => {
  log.title('docs : filters')

  const filters = await filterLib.filters()

  const filterDocs = filters.map(f =>
    [
      `## ${f.name}`,
      ``,
      `\`${f.name}${f.signature}\``,
      ``,
      f.description,
      ``,
    ].join(NEWLINE),
  )

  const content = [GENERATED_TAG, `# Filters`, '', ...filterDocs, ''].join(NEWLINE)

  await file.save(path.join(__dirname, '../utilities/filters.md'), content)
}

run()
