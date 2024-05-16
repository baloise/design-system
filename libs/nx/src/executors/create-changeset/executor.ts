import prompts from 'prompts'
import { readFile, rm, writeFile } from 'fs/promises'
import path, { join } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import { CreateChangesetExecutorSchema } from './schema'

export default async function runExecutor(options: CreateChangesetExecutorSchema) {
  let cleanUp = () => undefined

  try {
    const tagsPath = join(options.workspaceRoot, 'resources/data/tags.json')
    const tagsContent = await readFile(tagsPath, 'utf-8')
    const tags = JSON.parse(tagsContent)

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
          { title: 'core', value: 'core' },
          { title: 'angular', value: 'angular' },
          { title: 'styles', value: 'styles' },
          { title: 'devkit', value: 'devkit' },
          { title: 'testing', value: 'testing' },
          { title: 'tokens', value: 'tokens' },
          { title: 'vue', value: 'vue' },
          { title: 'react', value: 'react' },
          { title: 'table', value: 'table' },
          { title: 'font', value: 'font' },
          { title: 'brand-icons', value: 'brand-icons' },
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
      console.error('No bump level was defined!')
      return { success: false }
    }

    if (!response.scope) {
      console.error('No scope was defined!')
      return { success: false }
    }

    if (!response.summary) {
      console.error('No summary was defined!')
      return { success: false }
    }

    const content = `---
'@baloise/ds-core': ${response.bumpLevel}
---

**${response.scope}**: ${response.summary}
`

    // create new changeset file
    const { stdout } = await promisify(exec)(`npx changeset add --empty`)
    const triggerWord = '.changeset' + path.sep
    const start = stdout.lastIndexOf(triggerWord) + triggerWord.length
    const end = stdout.lastIndexOf('.md') + '.md'.length
    const filename = stdout.substring(start, end).trim()
    const filepath = join(options.workspaceRoot, '.changeset', filename)

    cleanUp = async () => rm(filepath, { force: true, recursive: true })
    await cleanUp()
    await writeFile(filepath.trim(), content, { encoding: 'utf-8' })

    console.log(``)
    console.log(`> ${filepath}`)
    console.log(``)
  } catch (error) {
    console.error(error)
    await cleanUp()
    return { success: false }
  }

  return { success: true }
}
