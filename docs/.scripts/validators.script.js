const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const path = require('path')
const utilities = require('../../packages/library/.scripts/utilities')
const { NEWLINE } = require('../../.scripts/constants')

const main = async () => {
  await log.title('validators : docs')
  const files = await utilities.read({ fileName: 'validators' })
  const validators = files.reduce((acc, f) => {
    return [...acc, ...f.functions]
  }, [])

  const filterDocs = validators.map(f =>
    [`## ${f.name}`, ``, `\`${f.name}${f.signature}\``, ``, f.documentation, ``].join(NEWLINE),
  )

  const content = [`# Validators`, '', ...filterDocs, ''].join(NEWLINE)
  await file.save(path.join(__dirname, '../src/guide/tooling/validators.md'), content)
}

main()
