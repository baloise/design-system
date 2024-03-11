import { JsonDocsStyle } from '@stencil/core/internal'

export function parseStyleDocs(styleDocs: JsonDocsStyle[], styleText: string | null) {
  if (typeof styleText !== 'string') {
    return
  }

  let startIndex: number
  while ((startIndex = styleText.indexOf(CSS_DOC_START)) > -1) {
    styleText = styleText.substring(startIndex + CSS_DOC_START.length)

    const endIndex = styleText.indexOf(CSS_DOC_END)
    if (endIndex === -1) {
      break
    }

    const comment = styleText.substring(0, endIndex)
    parseCssComment(styleDocs, comment, styleText)

    styleText = styleText.substring(endIndex + CSS_DOC_END.length)
  }
}

function parseCssComment(styleDocs: JsonDocsStyle[], comment: string, styleText: string): void {
  /**
   * @prop --max-width: Max width of the alert
   */
  // (the above is an example of what these comments might look like)

  const lines = comment.split(/\r?\n/).map(line => {
    line = line.trim()

    while (line.startsWith('*')) {
      line = line.substring(1).trim()
    }

    return line
  })

  comment = lines.join(' ').replace(/\t/g, ' ').trim()

  while (comment.includes('  ')) {
    comment = comment.replace('  ', ' ')
  }

  const docs = comment.split(CSS_PROP_ANNOTATION)

  docs.forEach(d => {
    const doc = d.trim()

    if (!doc.startsWith(`--`)) {
      return
    }

    function getValue(variableName: string) {
      const lines = styleText
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l.startsWith(variableName))
      return lines.shift()?.split(':').pop()?.trim().slice(0, -1).slice(4)
    }

    const splt = doc.split(`:`)
    const cssDoc: d.StyleDoc = {
      name: splt[0].trim(),
      value: getValue(splt[0].trim()),
      docs: (splt.shift() && splt.join(`:`)).trim(),
      annotation: 'prop',
    }

    if (!styleDocs.some(c => c.name === cssDoc.name && c.annotation === 'prop')) {
      styleDocs.push(cssDoc)
    }
  })
}

/**
 * Opening syntax for a CSS docstring
 */
const CSS_DOC_START = '/**'
/**
 * Closing syntax for a CSS docstring
 */
const CSS_DOC_END = '*/'
/**
 * The `@prop` annotation we support within CSS docstrings
 */
const CSS_PROP_ANNOTATION = '@prop'
