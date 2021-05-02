const path = require('path')
const file = require('../../../.scripts/file')

const { NEWLINE } = require('../../../.scripts/constants')

const START_TAG_TOP = '<!-- START: human documentation top -->'
const END_TAG_TOP = '<!-- END: human documentation top -->'

const START_TAG_BOTTOM = '<!-- START: human documentation bottom -->'
const END_TAG_BOTTOM = '<!-- END: human documentation bottom -->'

const parse = async component => {
  const pathToComponent = path.join(__dirname, '../../src/components/components', `${component.tag}.md`)
  const markdownContent = await file.read(pathToComponent)
  const markdownLines = markdownContent.split(NEWLINE)
  const topLines = []
  const bottomLines = []
  let hasReachedStartTagOfTop = false
  let hasReachedStartTagOfBottom = false

  for (let index = 0; index < markdownLines.length; index++) {
    const line = markdownLines[index]

    if (line.includes(START_TAG_TOP)) {
      hasReachedStartTagOfTop = true
    }

    if (line.includes(START_TAG_BOTTOM)) {
      hasReachedStartTagOfBottom = true
    }

    if (hasReachedStartTagOfTop) {
      topLines.push(line)
    }

    if (hasReachedStartTagOfBottom) {
      bottomLines.push(line)
    }

    if (line.includes(END_TAG_TOP)) {
      hasReachedStartTagOfTop = false
    }

    if (line.includes(END_TAG_BOTTOM)) {
      hasReachedStartTagOfBottom = false
    }
  }

  return {
    top: topLines.join(NEWLINE),
    bottom: bottomLines.join(NEWLINE),
  }
}

module.exports = {
  parse,
}
