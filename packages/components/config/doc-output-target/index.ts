import path from 'path'
import { globSync } from 'glob'
import { JsonDocs, JsonDocsStyle, OutputTargetDocsCustom } from '@stencil/core/internal'
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { propsToMarkdown } from './markdown-props'
import { eventsToMarkdown } from './markdown-events'
import { methodsToMarkdown } from './markdown-methods'
import { slotsToMarkdown } from './markdown-slots'
import { NEWLINE, SPACE } from './constants'
import contributors from '../../.tmp/contributors.json'
import { createTestingMarkdown } from './markdown-testing'
import { createThemingMarkdown } from './markdown-theming'
import { parseStyleDocs } from './markdonw-styles'
import { MarkdownTable } from './docs-util'
import { createStory } from './markdown-story'

const DOC_PATH = path.join(__dirname, '../../../../docs')

export const CustomDocumentationGenerator: OutputTargetDocsCustom = {
  type: 'docs-custom',
  generator: (docs: JsonDocs) => {
    /**
     * Create docs for each component
     */
    for (let index = 0; index < docs.components.length; index++) {
      const component = docs.components[index]
      const isDocs = component.filePath?.includes(`/docs/`)

      if (!isDocs) {
        const componentName = component.tag
        const storyPath = component.dirPath?.replace('packages/components/src', 'docs/stories') || ''

        const componentFolderDepth = component.filePath?.split('/').length
        const isNested = ['form', 'layout', 'notice', 'typography'].some(d => component.filePath?.includes(`/${d}/`))
        const isRoot = isNested ? componentFolderDepth === 6 : componentFolderDepth === 5

        // const [base] = storyPath.split('/docs/stories/components/')
        // const normalizedPath = path.join(base, 'docs/stories/components', component.tag)
        const normalizedPath = storyPath
          .split('/')
          .filter(p => !['form', 'layout', 'notice', 'typography'].includes(p))
          .join('/')

        try {
          mkdirSync(normalizedPath, { recursive: true })
        } catch (err) {
          console.error(err)
        }

        // Component API
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
          writeFileSync(path.join(normalizedPath, 'api.md'), content.join(NEWLINE))
        } catch (err) {
          console.error(err)
        }

        if (isRoot) {
          // Testing
          try {
            createTestingMarkdown(normalizedPath, component)
          } catch (err) {
            console.error(err)
          }

          // Theming
          try {
            createThemingMarkdown(normalizedPath, component)
          } catch (err) {
            console.error(err)
          }

          // // Story
          // try {
          //   createStory(normalizedPath, component)
          // } catch (err) {
          //   console.error(err)
          // }
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
      table.addHeader(['Variable'])
      cssVars[key].forEach(styleVariable => {
        table.addRow([`\`${styleVariable.name}\``])
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
    writeFileSync(path.join(DOC_PATH, 'stories/development/guides/theming/theming.md'), contentTheming.join(NEWLINE))

    /**
     * Create contributors page
     */
    const avatar =
      contributor => `<a href="${contributor.url}" target='_blank' style="flex: 1;" className="sb-unstyled text-decoration-none doc-button-card doc-shadow-hover is-flex is-flex-grow-1 is-flex-direction-column has-background-purple-1 p-normal has-radius-normal is-size-large has-text-primary"
  >
    <span className='is-display-block is-size-xx-large has-text-centered'>
      <img src="${contributor.avatar}" alt="${contributor.name}" />
    </span>
    <span className='is-display-block title is-size-medium has-text-centered mb-none text-decoration-none'>${contributor.name}</span>
  </a>`

    const contributorsContent = [
      `<div className="sb-unstyled is-flex is-flex-wrap-wrap fg-normal">`,
      ...contributors.map(c => avatar(c)),
      `</div>`,
      SPACE,
    ]

    try {
      writeFileSync(path.join(DOC_PATH, 'stories', 'contributors.md'), contributorsContent.join(NEWLINE))
    } catch (err) {
      console.error(err)
    }
  },
}
