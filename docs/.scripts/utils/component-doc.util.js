const path = require('path')
const file = require('../../../.scripts/file')

const { NEWLINE } = require('../../../.scripts/constants')

const START_TAG = '<!-- START: human documentation -->'
const END_TAG = '<!-- END: human documentation -->'

const parse = async component => {
  const pathToComponent = path.join(__dirname, '../../src/components/components', `${component.tag}.md`)
  const markdownContent = await file.read(pathToComponent)
  const markdownLines = markdownContent.split(NEWLINE)
  const lines = []
  let hasReachedStartTag = false

  for (let index = 0; index < markdownLines.length; index++) {
    const line = markdownLines[index]

    if (line.includes(START_TAG)) {
      hasReachedStartTag = true
    }

    if (hasReachedStartTag) {
      lines.push(line)
    }

    if (line.includes(END_TAG)) {
      hasReachedStartTag = false
    }
  }

  return lines.join(NEWLINE)
}

module.exports = {
  parse,
}
