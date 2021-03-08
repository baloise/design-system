const { NEWLINE } = require('../../../.scripts/constants')
const { convertToDotCase } = require('../../../.scripts/string')

const parse = (component, accessor) => {
  const baseUrl = 'https://github.com/baloise/ui-library/blob/master/packages'

  const lines = []
  lines.push('')
  lines.push('## Links')
  lines.push('')

  const componentUrl = `${baseUrl}/library/src/components/${component.tag}`
  const componentLink = `* [Component on Github](${componentUrl})`
  lines.push(componentLink)

  if (accessor) {
    const accessorUrl = `${baseUrl}/testing/src/accessors/${convertToDotCase(accessor.name)}.ts`
    const accessorLink = `* [Accessor on Github](${accessorUrl})`
    lines.push(accessorLink)
  }

  return lines.join(NEWLINE)
}

module.exports = {
  parse,
}
