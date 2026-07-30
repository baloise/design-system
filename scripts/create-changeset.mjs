/**
 * Create changeset — interactive prompt to generate changeset entries
 *
 * Interactive:     node scripts/create-changeset.mjs
 * Non-interactive: node scripts/create-changeset.mjs --bump=minor --scope=core,input-slider --summary="..."
 */
import prompts from 'prompts'
import { readFile, rm, writeFile } from 'node:fs/promises'
import path, { join, resolve, dirname } from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, '..')
const BUMP_LEVELS = ['patch', 'minor', 'major']

/**
 * Maps a scope choice to the package it should bump. Scopes without an entry here
 * (component tags like `input-slider`, or cross-cutting scopes like `a11y`/`deps`/`table`/`devkit`)
 * fall back to `@baloise/ds-core`, since that's where components/utilities actually live.
 */
const SCOPE_PACKAGE_MAP = {
  core: '@baloise/ds-core',
  angular: '@baloise/ds-angular',
  css: '@baloise/ds-css',
  tokens: '@baloise/ds-tokens',
  react: '@baloise/ds-react',
  assets: '@baloise/ds-assets',
  testing: '@baloise/ds-playwright',
}

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
 * Parse `--key=value` / `--key value` CLI flags into an object
 */
function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (!arg.startsWith('--')) continue
    const [key, inlineValue] = arg.slice(2).split('=')
    if (inlineValue !== undefined) {
      args[key] = inlineValue
    } else if (argv[i + 1] && !argv[i + 1].startsWith('--')) {
      args[key] = argv[++i]
    } else {
      args[key] = true
    }
  }
  return args
}

/**
 * Write a changeset file for the given bump level, scope(s), and summary.
 * Shared by both the interactive prompt flow and non-interactive CLI usage.
 */
async function writeChangeset({ bumpLevel, scope, summary }) {
  if (!BUMP_LEVELS.includes(bumpLevel)) {
    throw new Error(`Invalid bump level "${bumpLevel}". Expected one of: ${BUMP_LEVELS.join(', ')}`)
  }

  const scopes = Array.isArray(scope) ? scope : String(scope).split(',')
  const cleanScopes = scopes.map(s => s.trim()).filter(Boolean)
  if (cleanScopes.length === 0) {
    throw new Error('No scope provided')
  }

  if (!summary || !summary.trim()) {
    throw new Error('No summary provided')
  }

  const label = cleanScopes.join('/')
  const packages = [...new Set(cleanScopes.map(s => SCOPE_PACKAGE_MAP[s] ?? '@baloise/ds-core'))]
  const frontmatter = packages.map(pkg => `'${pkg}': ${bumpLevel}`).join('\n')
  const content = `---
${frontmatter}
---

**${label}**: ${summary.trim()}
`

  // Generate filename using changeset CLI
  const stdout = exec('pnpm exec changeset add --empty')
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
  console.log(`\x1b[32m✔\x1b[0m Changeset created: ${filepath}`)
  console.log('')

  return filepath
}

/**
 * Non-interactive flow — used when --bump, --scope, and --summary are all passed as CLI flags
 */
async function runNonInteractive(args) {
  await writeChangeset({
    bumpLevel: args.bump,
    scope: args.scope,
    summary: args.summary,
  })
}

/**
 * Interactive flow — prompts the user for bump level, scope(s), and summary
 */
async function runInteractive() {
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
        type: 'autocompleteMultiselect',
        name: 'scope',
        message: 'Pick the scope(s) for this change.',
        min: 1,
        instructions: '\x1b[90m(type to filter, space to select, enter to confirm)\x1b[0m',
        choices: [
          { title: 'core', value: 'core' },
          { title: 'angular', value: 'angular' },
          { title: 'css', value: 'css' },
          { title: 'devkit', value: 'devkit' },
          { title: 'testing', value: 'testing' },
          { title: 'tokens', value: 'tokens' },
          { title: 'react', value: 'react' },
          { title: 'table', value: 'table' },
          { title: 'assets', value: 'assets' },
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

    if (!response.scope || response.scope.length === 0) {
      console.error('✗ No scope selected')
      process.exit(1)
    }

    if (!response.summary) {
      console.error('✗ No summary provided')
      process.exit(1)
    }

    await writeChangeset({
      bumpLevel: response.bumpLevel,
      scope: response.scope,
      summary: response.summary,
    })
  } catch (error) {
    console.error('✗ Error creating changeset:', error.message)
    await cleanUp()
    process.exit(1)
  }
}

/**
 * Main
 */
async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.bump && args.scope && args.summary) {
    try {
      await runNonInteractive(args)
    } catch (error) {
      console.error('✗ Error creating changeset:', error.message)
      await cleanUp()
      process.exit(1)
    }
    return
  }

  await runInteractive()
}

await main()
