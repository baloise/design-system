const table = require('markdown-table')
const { NEWLINE } = require('../../../.scripts/constants')
const { printCode, printBold } = require('./markdown.util')

const parse = accessor => {
  const lines = []
  if (accessor) {
    lines.push(`## Testing`)
    lines.push(``)
    lines.push(`### ${accessor.name}`)
    lines.push('')
    lines.push(`${accessor.description.join(NEWLINE).trim()}`)
    lines.push('')

    if (accessor.methods && accessor.methods.length > 0) {
      lines.push(`#### Methods`)
      lines.push('')
      table(
        [
          ['Method', 'Description', 'Arguments'],
          ...accessor.methods.map(method => [
            printBold(method.name),
            method.description.join(' ').trim(),
            printCode(method.signature),
          ]),
        ],
        { align: ['l', 'l', 'l'] },
      )
        .split(NEWLINE)
        .forEach(l => lines.push(l))
    }
  }

  return lines.join(NEWLINE)
}

module.exports = {
  parse,
}
