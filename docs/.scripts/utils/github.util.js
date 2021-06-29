const { NEWLINE } = require('../../../.scripts/constants')
const { convertToDotCase } = require('../../../.scripts/string')

const parse = (component, accessor) => {
  const baseUrl = 'https://github.com/baloise/design-system/blob/master'

  const lines = []
  lines.push('')
  lines.push('## Edit this page on Github')
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

  lines.push('')
  lines.push('## Feedback')
  lines.push('')
  lines.push(
    'Help us improve this component by providing feedback, asking questions, and leaving any other comments on GitHub.',
  )
  lines.push('')

  return lines.join(NEWLINE)
}

module.exports = {
  parse,
}
