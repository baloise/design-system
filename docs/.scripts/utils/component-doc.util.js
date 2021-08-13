const path = require('path')
const file = require('../../../.scripts/file')

const { NEWLINE } = require('../../../.scripts/constants')

const START_TAG_TOP = '<!-- START: human documentation top -->'
const END_TAG_TOP = '<!-- END: human documentation top -->'

const START_TAG_USAGE = '<!-- START: human documentation usage -->'
const END_TAG_USAGE = '<!-- END: human documentation usage -->'

const START_TAG_STYLE = '<!-- START: human documentation style -->'
const END_TAG_STYLE = '<!-- END: human documentation style -->'

const START_TAG_SLOTS = '<!-- START: human documentation slots -->'
const END_TAG_SLOTS = '<!-- END: human documentation slots -->'

const parse = async component => {
  const pathToComponent = path.join(__dirname, '../../src/components/components', `${component.tag}.md`)
  let markdownContent = ''
  try {
    markdownContent = await file.read(pathToComponent)
  } catch (_) {}
  const markdownLines = markdownContent.split(NEWLINE)
  const topLines = []
  const usageLines = []
  const styleLines = []
  const slotLines = []
  let hasReachedStartTagOfTop = false
  let hasReachedStartTagOfUsage = false
  let hasReachedStartTagOfStyle = false
  let hasReachedStartTagOfSlots = false

  for (let index = 0; index < markdownLines.length; index++) {
    const line = markdownLines[index]

    if (line.includes(START_TAG_TOP)) {
      hasReachedStartTagOfTop = true
    }

    if (line.includes(START_TAG_USAGE)) {
      hasReachedStartTagOfUsage = true
    }

    if (line.includes(START_TAG_STYLE)) {
      hasReachedStartTagOfStyle = true
    }

    if (line.includes(START_TAG_SLOTS)) {
      hasReachedStartTagOfSlots = true
    }

    if (hasReachedStartTagOfTop) {
      topLines.push(line)
    }

    if (hasReachedStartTagOfUsage) {
      usageLines.push(line)
    }

    if (hasReachedStartTagOfStyle) {
      styleLines.push(line)
    }

    if (hasReachedStartTagOfSlots) {
      slotLines.push(line)
    }

    if (line.includes(END_TAG_TOP)) {
      hasReachedStartTagOfTop = false
    }

    if (line.includes(END_TAG_USAGE)) {
      hasReachedStartTagOfUsage = false
    }

    if (line.includes(END_TAG_STYLE)) {
      hasReachedStartTagOfStyle = false
    }

    if (line.includes(END_TAG_SLOTS)) {
      hasReachedStartTagOfSlots = false
    }
  }

  return {
    top: topLines.join(NEWLINE),
    usage: usageLines.join(NEWLINE),
    style: styleLines.join(NEWLINE),
    slots: slotLines.join(NEWLINE),
  }
}

module.exports = {
  parse,
}
