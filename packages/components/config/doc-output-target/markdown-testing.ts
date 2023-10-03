import path from 'path'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { JsonDocsComponent } from '@stencil/core/internal'
import { NEWLINE } from './constants'
import testingCommands from '../../.tmp/commands.json'
import testingSelectors from '../../.tmp/selectors.json'
import { commandsToMarkdown } from './markdown-commands'
import { selectorsToMarkdown } from './markdown-selectors'

export const createTestingMarkdown = (docsPath: string, component: JsonDocsComponent) => {
  const componentName = component.tag
  const START_TAG_TOP = '<!-- START: human documentation -->'
  const END_TAG_TOP = '<!-- END: human documentation -->'
  const pathToTestingMarkdown = path.join(docsPath, 'testing.md')

  let selectorsList: string[] = []
  if (testingSelectors[0][formatComponentName(componentName)] != undefined) {
    selectorsList = selectorsToMarkdown(
      testingSelectors[0][formatComponentName(componentName)],
      formatComponentName(componentName),
    )
  }

  let file = ''
  if (existsSync(path.join(docsPath, 'testing.md'))) {
    file = readFileSync(pathToTestingMarkdown, 'utf8')
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
  const componentCommands = testingCommands.filter(c => c.component === component.tag)

  const content = [
    `## Testing`,
    '',
    'The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.',
    '',
    '<a class="button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>',
    '',
    '<!-- START: human documentation -->',
    '',
    humanLines.join(NEWLINE).trim(),
    '',
    '<!-- END: human documentation -->',
    '',
    ...commandsToMarkdown(componentCommands),
    '',
    ...selectorsList,
  ]

  writeFileSync(pathToTestingMarkdown, content.join(NEWLINE))
}

const formatComponentName = (name: string) => {
  const componentName = name.split('-')
  return componentName.length === 2
    ? componentName[1]
    : componentName[1] + componentName[2].charAt(0).toUpperCase() + componentName[2].slice(1)
}
