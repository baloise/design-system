/**
 * Sync codepen version — updates DESIGN_SYSTEM_VERSION in docs/.storybook/blocks/codepen.ts
 * to match the current @baloise/ds-core package version. Run after `changeset version`.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, '..')

const corePackagePath = resolve(workspaceRoot, 'packages/core/package.json')
const codepenPath = resolve(workspaceRoot, 'docs/.storybook/blocks/codepen.ts')

async function main() {
  const { version } = JSON.parse(await readFile(corePackagePath, 'utf-8'))

  const codepenSource = await readFile(codepenPath, 'utf-8')
  const updated = codepenSource.replace(
    /const DESIGN_SYSTEM_VERSION = '[^']+'/,
    `const DESIGN_SYSTEM_VERSION = '${version}'`,
  )

  if (updated === codepenSource) {
    console.log(`✔ DESIGN_SYSTEM_VERSION already up to date (${version})`)
    return
  }

  await writeFile(codepenPath, updated, 'utf-8')
  console.log(`✔ Updated DESIGN_SYSTEM_VERSION to ${version} in ${codepenPath}`)
}

await main()
