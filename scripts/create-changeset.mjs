/**
 * Create changeset — interactive prompt to generate changeset entries
 *
 * Run with: node scripts/create-changeset.mjs
 */
import prompts from 'prompts'
import { readFile, rm, writeFile } from 'node:fs/promises'
import path, { join, resolve, dirname } from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, '..')

let cleanUp = () => Promise.resolve()

/**
 * Execute a command and return stdout
 */
function exec(cmd) {
  try {
    const stdout = execSync(cmd, { encoding: 'utf-8' })
    return stdout
  } catch (err) {
    throw new Error(`Command failed: ${cmd}\n${err.message}`)
  }
}

/**
 * Main
 */
async function main() {
  try {
    // Read tags from core dist
    const tagsPath = join(workspaceRoot, 'packages/core/docs/tags.json')
    const tagsContent = await readFile(tagsPath, 'utf-8')
    const tags = JSON.parse(tagsContent)

    // Prompt for changeset details
    const response = await prompts([
      {
        type: 'select',
        name: 'bumpLevel',
        message: 'What type of change is it?',
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
          { title: 'react', value: 'react' },
          { title: 'table', value: 'table' },
          { title: 'font', value: 'font' },
          { title: 'brand-icons', value: 'brand-icons' },
          { title: 'maps', value: 'maps' },
          { title: 'favicons', value: 'favicons' },
          { title: 'deps', value: 'deps' },
          { title: 'a11y', value: 'a11y' },
          ...tags.map(tag => ({
            title: tag.replace('ds-', ''),
            value: tag.replace('ds-', ''),
          })),
        ],
      },
      {
        type: 'text',
        name: 'summary',
        message: 'Please enter a summary for this change.',
      },
    ])

    // Validate responses
    if (!response.bumpLevel) {
      console.error('✗ No bump level selected')
      process.exit(1)
    }

    if (!response.scope) {
      console.error('✗ No scope selected')
      process.exit(1)
    }

    if (!response.summary) {
      console.error('✗ No summary provided')
      process.exit(1)
    }

    // Prepare changeset content
    const content = `---
'@baloise/ds-core': ${response.bumpLevel}
---

**${response.scope}**: ${response.summary}
`

    // Generate filename using changeset CLI
    const stdout = exec('npx changeset add --empty')
    const triggerWord = '.changeset' + path.sep
    const start = stdout.lastIndexOf(triggerWord) + triggerWord.length
    const end = stdout.lastIndexOf('.md') + '.md'.length
    const filename = stdout.substring(start, end).trim()
    const filepath = join(workspaceRoot, '.changeset', filename)

    // Setup cleanup on error
    cleanUp = async () => rm(filepath, { force: true, recursive: true })

    // Write changeset file
    await rm(filepath, { force: true, recursive: true })
    await writeFile(filepath.trim(), content, { encoding: 'utf-8' })

    console.log('')
    console.log(`\\x1b[32m✔\\x1b[0m Changeset created: ${filepath}`)
    console.log('')
  } catch (error) {
    console.error('✗ Error creating changeset:', error.message)
    await cleanUp()
    process.exit(1)
  }
}

await main()
