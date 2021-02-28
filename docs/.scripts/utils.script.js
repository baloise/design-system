/**
 * utils - docs
 * --------------------------------------
 * This script reads the filter.json and creates
 * out of this information the documentation markdown file.
 */

const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const path = require('path')
const utilities = require('../../packages/library/.scripts/utilities')
const { NEWLINE, GENERATED_TAG } = require('./utils/constants')

const run = async () => {
  log.title('utils : docs')
  const files = await utilities.read({ fileName: 'utils' })

  const filterDocs = files.map(u =>
    [
      `## ${u.fileName}`,
      '',
      '```typescript',
      `import { ${u.fileName} } from '@baloise/ui-library'`,
      '```',
      '',
      ...u.functions.map(f =>
        [`### ${f.name}`, ``, `\`${f.name}${f.signature}\``, ``, f.documentation, ``].join(NEWLINE),
      ),
      ``,
      `---`,
      ``,
    ].join(NEWLINE),
  )

  const content = [GENERATED_TAG, `# Utils`, '', ...filterDocs, ''].join(NEWLINE)

  await file.save(path.join(__dirname, '../utilities/utils.md'), content)
}

run()
