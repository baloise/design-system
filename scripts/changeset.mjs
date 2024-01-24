import { fileURLToPath } from 'url'
import path from 'path'
import prompts from 'prompts'
import { done, logger, exec, writeFile, readFile, exit } from './utils.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')

const run = async () => {
  const log = logger('Add changeset')
  log.start()

  const tags = JSON.parse(await readFile(path.join(__dirname, 'resources/data/tags.json')))

  try {
    const { output } = await exec('changeset', ['add', '--empty'])
    const lastLine = output[output.length - 1] || ''
    const fileName = lastLine.split('/.changeset/')[1].trim()

    const response = await prompts([
      {
        type: 'select',
        name: 'bumpLevel',
        message: 'What do type of change is it?',
        choices: [
          {
            title: '\x1B[34mpatch \x1b[90m(bugs, dep-updates)',
            value: 'patch',
            selected: true,
          },
          {
            title: '\x1b[32mminor \x1b[90m(features)',
            value: 'minor',
          },
          {
            title: '\x1B[31mmajor \x1b[90m(breaking changes)',
            value: 'major',
          },
        ],
        instructions: false,
      },
      {
        type: 'autocomplete',
        name: 'scope',
        message: 'Pick the scope for this change.',
        choices: [
          { title: 'cli', value: 'cli' },
          { title: 'brand-icons', value: 'brand-icons' },
          { title: 'components', value: 'components' },
          { title: 'angular', value: 'angular' },
          { title: 'vue', value: 'vue' },
          { title: 'react', value: 'react' },
          { title: 'table', value: 'table' },
          { title: 'testing', value: 'testing' },
          { title: 'font', value: 'font' },
          { title: 'styles', value: 'styles' },
          { title: 'tokens', value: 'tokens' },
          { title: 'maps', value: 'maps' },
          { title: 'favicons', value: 'favicons' },
          { title: 'deps', value: 'deps' },
          { title: 'a11y', value: 'a11y' },
          ...tags.map(tag => {
            return {
              title: `${tag.replace('bal-', '')}`,
              value: tag.replace('bal-', ''),
            }
          }),
        ],
      },
      {
        type: 'text',
        name: 'summary',
        message: 'Please enter a summary for this change.',
      },
    ])

    if (!response.bumpLevel) {
      log.fail('No bump level was defined!')
      return exit()
    }

    if (!response.scope) {
      log.fail('No scope was defined!')
      return exit()
    }

    if (!response.summary) {
      log.fail('No summary was defined!')
      return exit()
    }

    const content = `---
'@baloise/design-system-components': ${response.bumpLevel}
---

**${response.scope}**: ${response.summary}
`

    await writeFile(path.join(__dirname, '.changeset', fileName), content)

    log.info()
    log.list(path.join(__dirname, '.changeset', fileName))
    log.info()
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

run()
