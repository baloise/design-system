/**
 * validators - docs
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
  await log.title('validators : docs')
  const files = await utilities.read({ fileName: 'validators' })
  const validators = files.reduce((acc, f) => {
    return [...acc, ...f.functions]
  }, [])

  const filterDocs = validators.map(f =>
    [`## ${f.name}`, ``, `\`${f.name}${f.signature}\``, ``, f.documentation, ``].join(NEWLINE),
  )

  const content = [GENERATED_TAG, `# Validators`, '', ...filterDocs, ''].join(NEWLINE)
  await file.save(path.join(__dirname, '../utilities/validators.md'), content)
}

run()
