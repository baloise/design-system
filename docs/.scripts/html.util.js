const htmlParser = require('node-html-parser')
const { NEWLINE, INDENT } = require('../../.scripts/constants')

const isTextNode = node => node.nodeType === 3

function attributesToString(attrs) {
  const lines = []
  for (const [key, value] of Object.entries(attrs)) {
    lines.push(`${key}="${value}"`)
  }
  return lines.join(' ')
}

function parseChild(node) {
  if (isTextNode(node)) {
    const rawText = node.rawText.trim()
    if (rawText === NEWLINE || rawText.length === 0) {
      return ''
    }
    return `${rawText.split(NEWLINE).join('<br/>')}`
  }

  const tag = node.tagName.toLowerCase()
  const attrs = attributesToString(node.attributes)

  if (node.childNodes.length > 0) {
    return [`<${tag} ${attrs}>`, node.childNodes.map(parseChild).join(''), `</${tag}>`].join(NEWLINE)
  }

  return `<${tag} ${attrs}></${tag}>`
}

function formatToMarkdownHtml(html) {
  const root = htmlParser.parse(html)
  const list = root.childNodes.map(parseChild).filter(s => s.trim().length > 0)
  return list.join(NEWLINE)
}

module.exports = {
  formatToMarkdownHtml,
}
