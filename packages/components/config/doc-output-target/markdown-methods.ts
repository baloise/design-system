import type * as d from '@stencil/core/internal'
import { MarkdownTable } from './docs-util'

const getDocsField = (prop: d.JsonDocsMethod) => {
  return `${
    prop.deprecation !== undefined
      ? `<span style="color:red">**[DEPRECATED]**</span> ${prop.deprecation}<br/><br/>`
      : ''
  }${prop.docs}`
}

export const methodsToMarkdown = (methods: d.JsonDocsMethod[]) => {
  const content: string[] = []
  if (methods.length === 0) {
    return content
  }

  content.push(`#### Methods`)
  content.push(``)

  const table = new MarkdownTable()

  table.addHeader(['Method', 'Description', 'Type'])

  methods.forEach(m => {
    table.addRow([`\`${m.name}\``, getDocsField(m), `\`${m.signature}\``])
  })

  content.push(...table.toMarkdown())

  return content
}
