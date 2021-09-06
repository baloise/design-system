const table = require('markdown-table')
const { NEWLINE } = require('../../../.scripts/constants')
const { printCode, printBold } = require('./markdown.util')

const parse = command => {
  const lines = []
  if (command) {
    if (command.length > 0) {
      lines.push(`#### Commands`)
      lines.push('')
      table(
        [
          ['Command', 'Description', 'Signature'],
          ...command.map(c => [printBold(c.name), c.description.join(' ').trim(), printCode(c.signature)]),
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
