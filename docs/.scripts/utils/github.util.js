const { NEWLINE } = require('../../../.scripts/constants')
const { convertToDotCase } = require('../../../.scripts/string')

const parse = (component, command) => {
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

  if (command) {
    const commandUrl = `${baseUrl}/packages/testing/src/commands`
    const commandLink = `* [Cypress commands on Github](${commandUrl})`
    lines.push(commandLink)
  }

  lines.push('')
  lines.push('## Feedback')
  lines.push('')
  lines.push(
    'Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).',
  )
  lines.push('')

  return lines.join(NEWLINE)
}

module.exports = {
  parse,
}
