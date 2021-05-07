const { NEWLINE } = require('../../../.scripts/constants')
const { convertToDotCase } = require('../../../.scripts/string')

const parse = (component, accessor) => {
  const baseUrl = 'https://github.com/baloise/ui-library/blob/master'

  const lines = []
  lines.push('')
  lines.push('## Links')
  lines.push('')

  const documentationUrl = `${baseUrl}/docs/src/components/components/${component.tag}.md`
  const documentationLink = `* [Documentation on Github](${documentationUrl})`
  lines.push(documentationLink)

  const componentUrl = `${baseUrl}/packages/components/src/components/${component.tag}`
  const componentLink = `* [Implementation on Github](${componentUrl})`
  lines.push(componentLink)

  if (accessor) {
    const accessorUrl = `${baseUrl}/packages/testing/src/accessors/${convertToDotCase(accessor.name)}.ts`
    const accessorLink = `* [Accessor on Github](${accessorUrl})`
    lines.push(accessorLink)
  }

  return lines.join(NEWLINE)
}

module.exports = {
  parse,
}
