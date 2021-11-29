import path from 'path'
import { JsonDocs, OutputTargetDocsCustom } from '@stencil/core/internal'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { commandsToMarkdown } from './markdown-commands'
import { propsToMarkdown } from './markdown-props'
import { eventsToMarkdown } from './markdown-events'
import { methodsToMarkdown } from './markdown-methods'
import { slotsToMarkdown } from './markdown-slots'
import { NEWLINE, SPACE } from './constants'
import testingCommands from '../../../testing/docs/commands.json'
import contributors from '../../docs/contributors.json'

export const CustomDocumentationGenerator: OutputTargetDocsCustom = {
  type: 'docs-custom',
  generator: (docs: JsonDocs) => {
    for (let index = 0; index < docs.components.length; index++) {
      // Component API
      const component = docs.components[index]

      const props = propsToMarkdown(component.props)
      const events = eventsToMarkdown(component.events)
      const methods = methodsToMarkdown(component.methods)
      const slots = slotsToMarkdown(component.slots)
      const componentApi = [...props, ...events, ...methods, ...slots]
      const hasComponentApi = componentApi.length > 0

      let content = []

      if (hasComponentApi) {
        content = [`### ${component.tag}`, SPACE, ...componentApi, SPACE]
      }

      try {
        writeFileSync(component.readmePath, content.join(NEWLINE))
      } catch (err) {
        console.error(err)
      }

      const docsPath = path.join(component.dirPath, 'docs')
      if (existsSync(docsPath)) {
        // Testing
        try {
          const START_TAG_TOP = '<!-- START: human documentation -->'
          const END_TAG_TOP = '<!-- END: human documentation -->'
          const pathToTestingMarkdown = path.join(docsPath, 'testing.md')

          let file = ''
          if (existsSync(path.join(docsPath, 'testing.md'))) {
            file = readFileSync(pathToTestingMarkdown, 'utf8')
          }

          const markdownLines = file.split(NEWLINE)
          const humanLines = []
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

          const componentCommands = testingCommands.filter(c => c.component === component.tag)

          const content = [
            `## Testing`,
            SPACE,
            'The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.',
            SPACE,
            '- [More information about the installation and usage](/components/tooling/testing.html)',
            SPACE,
            '<!-- START: human documentation -->',
            SPACE,
            ...humanLines,
            SPACE,
            '<!-- END: human documentation -->',
            SPACE,
            ...commandsToMarkdown(componentCommands),
            SPACE,
          ]

          writeFileSync(pathToTestingMarkdown, content.join(NEWLINE))
        } catch (err) {
          console.error(err)
        }

        // Github link
        try {
          const content = [
            '<br />',
            SPACE,
            '## Feedback',
            SPACE,
            'Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system).',
            SPACE,
            '<br />',
            SPACE,
            `[✍️ Edit on GitHub – PRs welcome!](https://github.com/baloise/design-system/tree/master/packages/components/${component.filePath.replace('./src', 'src')})`,
          ]
          writeFileSync(path.join(docsPath, 'github.md'), content.join(NEWLINE))
        } catch (err) {
          console.error(err)
        }
      }
    }

    const avatar = contributor => `  <a href="${contributor.url}" class="feature">
    <h2>
      <img src="${contributor.avatar}" alt="${contributor.name}" style="width: 64px;">
    </h2>
    <h4>${contributor.name}</h4>
  </a>`

    const contributorsContent = [`<div class="features">`, ...contributors.map(c => avatar(c)), `</div>`, SPACE]

    try {
      writeFileSync(path.join(__dirname, '../../src/stories', 'contributors.md'), contributorsContent.join(NEWLINE))
    } catch (err) {
      console.error(err)
    }
  },
}
