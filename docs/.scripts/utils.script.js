const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const utilsLib = require('../../packages/library/.scripts/utils.lib')
const path = require('path')
const { NEWLINE, GENERATED_TAG } = require('./utils/constants')

const run = async () => {
  log.title('docs : utils')

  const utils = await utilsLib.utils()

  const filterDocs = utils.map(u =>
    [
      `## ${u.name}`,
      '',
      ...u.functions.map(f => [
        `### ${f.name}`,
        ``,
        `\`${f.name}${f.signature}\``,
        ``,
        f.description,
        ``,
      ].join(NEWLINE)),
      ``,
      `---`,
      ``,
    ].join(NEWLINE),
  )

  const content = [GENERATED_TAG, `# Utils`, '', ...filterDocs, ''].join(NEWLINE)

  await file.save(path.join(__dirname, '../utilities/utils.md'), content)
}

run()
