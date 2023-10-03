import path from 'path'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { JsonDocsComponent, JsonDocsStyle } from '@stencil/core/internal'
import { NEWLINE } from './constants'
import { parseStyleDocs } from './markdonw-styles'
import { MarkdownTable } from './docs-util'

export const createThemingMarkdown = (docsPath: string, component: JsonDocsComponent) => {
  const START_TAG_TOP = '<!-- START: human documentation -->'
  const END_TAG_TOP = '<!-- END: human documentation -->'
  const pathToMarkdown = path.join(docsPath, 'theming.md')

  let file = ''
  if (existsSync(path.join(docsPath, 'theming.md'))) {
    file = readFileSync(pathToMarkdown, 'utf8')
  }

  const markdownLines = file.split(NEWLINE)
  const humanLines: string[] = []
  let hasReachedHumanPart = false
  for (let index = 0; index < markdownLines.length; index++) {
    const line = markdownLines[index]

    if (line === END_TAG_TOP) {
      hasReachedHumanPart = false
    }

    if (hasReachedHumanPart) {
      humanLines.push(line)
    }

    if (line === START_TAG_TOP) {
      hasReachedHumanPart = true
    }
  }

  const filePath = (component.filePath || '').replace('.tsx', '.vars.sass')
  let content: string[] = []
  try {
    const varsFile = readFileSync(path.join(filePath), 'utf8')

    const styleDocs: JsonDocsStyle[] = []
    parseStyleDocs(styleDocs, varsFile)

    const table = new MarkdownTable()
    table.addHeader(['Variable'])
    styleDocs.forEach(styleVariable => {
      table.addRow([`\`${styleVariable.name}\``])
    })

    const hasTheming = styleDocs.length > 0

    if (hasTheming) {
      content = [
        `## Theming`,
        '',
        'The component can be customization by changing the CSS variables.',
        '',
        '<a class="sb-unstyled button is-primary" href="../?path=/docs/development-theming--page">Go to theming guide</a>',
        '',
        '<!-- START: human documentation -->',
        '',
        humanLines.join(NEWLINE).trim(),
        '',
        '<!-- END: human documentation -->',
        '',
        '### CSS Custom Variables​',
        '',
        ...table.toMarkdown(),
        '',
      ]
    }
  } catch (_error) {
    // skip components without vars files
  }

  writeFileSync(pathToMarkdown, content.join(NEWLINE))
}
