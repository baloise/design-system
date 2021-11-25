const NEWLINE = '\n'
const printBold = text => (!!text ? `**${text}**` : '')

const printCode = text => {
  if (text === undefined || text === null || text.length === 0) {
    return text
  }
  const code = text.split('|').join(' &#124; ').split('<').join('&#60;').split('>').join('&#62;').trim().split(NEWLINE).join(' ').trim()
  return `<code>${code}</code>`
}

module.exports = {
  printCode,
  printBold,
}
