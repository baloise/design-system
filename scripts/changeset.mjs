import { fileURLToPath } from 'url'
import path from 'path'
import prompts from 'prompts'
import { done, logger, exec, writeFile } from './utils.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')

const run = async () => {
  const log = logger('Add changeset')
  log.start()

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
            title: '\x1b[32mpatch \x1b[90m(bugs, dep-updates)',
            value: 'patch',
            selected: true,
          },
          {
            title: '\x1b[32mminor \x1b[90m(features)',
            value: 'minor',
          },
          {
            title: '\x1b[32mmajor \x1b[90m(breaking changes)',
            value: 'major',
          },
        ],
        instructions: false,
      },
      {
        type: 'text',
        name: 'summary',
        message: 'Please enter a summary for this change. \x1b[90m(this will be in the changelogs)',
      },
    ])

    const content = `---
'@baloise/design-system-components': ${response.bumpLevel}
---

${response.summary}
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
