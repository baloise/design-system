import path from 'path'
import { JsonDocs, OutputTargetDocsCustom } from '@stencil/core/internal'
import { writeFileSync, existsSync } from 'fs'
import { propsToMarkdown } from './markdown-props'
import { eventsToMarkdown } from './markdown-events'
import { methodsToMarkdown } from './markdown-methods'
import { slotsToMarkdown } from './markdown-slots'
import { NEWLINE, SPACE } from './constants'
import contributors from '../../public/assets/data/contributors.json'
import { createTestingMarkdown } from './markdown-testing'
import { createThemingMarkdown } from './markdown-theming'

export const CustomDocumentationGenerator: OutputTargetDocsCustom = {
  type: 'docs-custom',
  generator: (docs: JsonDocs) => {
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
