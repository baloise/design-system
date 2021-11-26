import path from 'path'
import { JsonDocs } from '@stencil/core/internal'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { commandsToMarkdown } from './markdown-commands'
import { propsToMarkdown } from './markdown-props'
import { eventsToMarkdown } from './markdown-events'
import { methodsToMarkdown } from './markdown-methods'
import { slotsToMarkdown } from './markdown-slots'
import { NEWLINE } from './constants'
import testingCommands from '../../../testing/docs/commands.json'

export const CustomDocumentationGenerator = (docs: JsonDocs) => {
  for (let index = 0; index < docs.components.length; index++) {
    // Component API
    const component = docs.components[index]

    const props = propsToMarkdown(component.props)
    const events = propsToMarkdown(component.props)
    const methods = propsToMarkdown(component.props)
    const slots = propsToMarkdown(component.props)
    const componentApi = [...props, ...events, ...methods, ...slots]
    const hasComponentApi = componentApi.length > 0

    let content = []

    if (hasComponentApi) {
      content = [`## Component Api`, NEWLINE, `### ${component.tag}`, NEWLINE, ...componentApi]
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
        const file = readFileSync(pathToTestingMarkdown, 'utf8')
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
          NEWLINE,
          'The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.',
          NEWLINE,
          '- [More information about the installation and usage](/components/tooling/testing.html)',
          NEWLINE,
          '<!-- START: human documentation -->',
          NEWLINE,
          ...humanLines,
          NEWLINE,
          '<!-- END: human documentation -->',
          NEWLINE,
          `## Custom Commands`,
          NEWLINE,
          'A list of the custom commands for this specific component.',
          NEWLINE,
          ...commandsToMarkdown(componentCommands),
          NEWLINE,
        ]

        writeFileSync(pathToTestingMarkdown, content.join(NEWLINE))
      } catch (err) {
        console.error(err)
      }

      // Github link
      try {
        const content = [
          '<br />',
          NEWLINE,
          '## Feedback',
          NEWLINE,
          'Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system).',
          NEWLINE,
          '<br />',
          NEWLINE,
          `[✍️ Edit on GitHub – PRs welcome!](https://github.com/baloise/design-system/tree/master/packages/components/${component.filePath.replace('./src', 'src')})`,
        ]
        writeFileSync(path.join(docsPath, 'github.md'), content.join(NEWLINE))
      } catch (err) {
        console.error(err)
      }
    }
  }
}
