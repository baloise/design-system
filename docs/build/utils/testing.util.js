const table = require('markdown-table')
const { accessors } = require('./accessors.util')
const { NEWLINE } = require('../constants')
const { printCode, printBold } = require('./markdown.util')

const parseTesting = (component) => {
    const lines = []
    const accessor = accessors.get(component.tag)
    if (accessor) {
        lines.push(`## Testing`)
        lines.push(``)
        lines.push(`### ${printCode(accessor.name)}`)
        lines.push('')
        lines.push(`${accessor.description}`)
        lines.push('')

        if (accessor.methods && accessor.methods.length > 0) {
            lines.push(`#### Methods`)
            lines.push('')
            table([
                ['Method', 'Description', 'Arguments'],
                ...accessor.methods.map(method => ([
                    printBold(printCode(method.name)),
                    method.description.trim(),
                    printCode(method.signature),
                ])),
            ], { align: ['l', 'l', 'l'] })
                .split(NEWLINE).forEach(l => lines.push(l))
        }
    }

    return lines.join(NEWLINE)
}

module.exports = {
    parseTesting,
}
