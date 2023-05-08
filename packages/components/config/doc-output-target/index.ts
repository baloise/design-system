import path from 'path'
import { globSync } from 'glob'
import { JsonDocs, JsonDocsStyle, OutputTargetDocsCustom } from '@stencil/core/internal'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { propsToMarkdown } from './markdown-props'
import { eventsToMarkdown } from './markdown-events'
import { methodsToMarkdown } from './markdown-methods'
import { slotsToMarkdown } from './markdown-slots'
import { NEWLINE, SPACE } from './constants'
import contributors from '../../public/assets/data/contributors.json'
import { createTestingMarkdown } from './markdown-testing'
import { createThemingMarkdown } from './markdown-theming'
import { parseStyleDocs } from './markdonw-styles'
import { MarkdownTable } from './docs-util'

export const CustomDocumentationGenerator: OutputTargetDocsCustom = {
  type: 'docs-custom',
  generator: (docs: JsonDocs) => {
    /**
     * Create docs for each component
     */
    for (let index = 0; index < docs.components.length; index++) {
      // Component API
      const component = docs.components[index]
      const componentName = component.tag

      const props = propsToMarkdown(component.props)
      const events = eventsToMarkdown(component.events)
      const methods = methodsToMarkdown(component.methods)
      const slots = slotsToMarkdown(component.slots)
      const componentApi = [...props, ...events, ...methods, ...slots]
      const hasComponentApi = componentApi.length > 0

      let content: string[] = []

      if (hasComponentApi) {
        content = [`### ${componentName}`, SPACE, ...componentApi, SPACE]
      }

      try {
        writeFileSync(component.readmePath || '', content.join(NEWLINE))
      } catch (err) {
        console.error(err)
      }
      const docsPath = path.join(component.dirPath || '', 'stories')
      if (existsSync(docsPath)) {
        // Testing
        try {
          createTestingMarkdown(docsPath, component)
        } catch (err) {
          console.error(err)
        }

        // Theming
        try {
          createThemingMarkdown(docsPath, component)
        } catch (err) {
          console.error(err)
        }
      }
    }

    /**
     * Theming
     * -----------------------------------------
     * Create theming vars of the css package
     */
    const cssVarsFiles = globSync(path.join(__dirname, '../../../css/src/core/vars', '*.vars.sass'))
    const cssVars: { [key: string]: JsonDocsStyle[] } = {}

    const camelize = s => s.replace(/-./g, x => ` ${x[1].toUpperCase()}`)

    const capitalized = s => s.charAt(0).toUpperCase() + s.slice(1)

    const getFileName = (filePath: string) =>
      (filePath.split('/').pop() || 'global.vars.sass').replace('.vars.sass', '')

    for (let index = 0; index < cssVarsFiles.length; index++) {
      const cssVarsFile = cssVarsFiles[index]
      const varsFile = readFileSync(cssVarsFile, 'utf8')
      const styleDocs: JsonDocsStyle[] = []
      parseStyleDocs(styleDocs, varsFile)
      cssVars[capitalized(camelize(getFileName(cssVarsFile)))] = styleDocs
    }

    let themingLines: string[] = []
    for (const key in cssVars) {
      const table = new MarkdownTable()
      table.addHeader(['Variable', 'Description'])
      cssVars[key].forEach(styleVariable => {
        table.addRow([`\`${styleVariable.name}\``, styleVariable.docs])
      })
      themingLines = [...themingLines, '', `### ${key}`, '', ...table.toMarkdown()]
    }

    const contentTheming: string[] = [
      `## Global CSS Variables`,
      '',
      'These are the variables of the CSS-Framework which inherit from the design tokens.',
      '',
      ...themingLines,
      '',
    ]
    writeFileSync(
      path.join(__dirname, '../../src/stories/development/guides/theming/theming.md'),
      contentTheming.join(NEWLINE),
    )

    /**
     * Create contributors page
     */

    const avatar = contributor => `  <a href="${contributor.url}" class="avatar">
    <h2>
      <img src="${contributor.avatar}" alt="${contributor.name}" style="width: 64px;">
    </h2>
    <h4>${contributor.name}</h4>
  </a>`

    const contributorsContent = [`<div class="avatars">`, ...contributors.map(c => avatar(c)), `</div>`, SPACE]

    try {
      writeFileSync(path.join(__dirname, '../../src/stories', 'contributors.md'), contributorsContent.join(NEWLINE))
    } catch (err) {
      console.error(err)
    }
  },
}
