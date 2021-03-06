const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const path = require('path')
const utilities = require('../../packages/library/.scripts/utilities')
const { NEWLINE } = require('../../.scripts/constants')

const main = async () => {
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

  const content = [`# Utils`, '', ...filterDocs, ''].join(NEWLINE)

  await file.save(path.join(__dirname, '../src/guide/tooling/utils.md'), content)
}

main()
