const printBold = text => (!!text ? `**${text}**` : '')

const printCode = text => (!!text ? `\`${text}\`` : '')

module.exports = {
  printCode,
  printBold,
}
