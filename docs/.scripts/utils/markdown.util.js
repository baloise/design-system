const printBold = (text) => !!text ? `**${text}**` : ''

const printCode = (text) => !!text ? `<code>${text}</code>` : ''

module.exports = {
    printCode,
    printBold,
}
