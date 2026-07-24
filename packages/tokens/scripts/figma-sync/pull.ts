import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { diffBrandTree } from './diff.js'
import { fetchLocalVariables } from './figma-client.js'
import { buildModeTree, type TokenTree } from './transform.js'

// Brand modes to pull in addition to Base — keep in sync with the `brands`
// array in packages/tokens/src/index.ts (see ADR 0001: modes, not
// collections, so adding a brand here is a deliberate code change).
const BRANDS = ['Tcs']

const TOKENS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../../tokens')

async function main(): Promise<void> {
  const fileKey = requireEnv('FIGMA_FILE_KEY')
  const token = requireEnv('FIGMA_TOKEN')

  const response = await fetchLocalVariables(fileKey, token)

  const collectionIds = Object.keys(response.meta.variableCollections)
  if (collectionIds.length !== 1) {
    throw new Error(
      `Expected exactly one Figma variable collection, found ${collectionIds.length}: ${collectionIds.join(', ')}`,
    )
  }
  const [collectionId] = collectionIds

  const { tree: baseTree } = buildModeTree(response, collectionId, 'Base')
  writeTokensFile('Base', baseTree)

  for (const brand of BRANDS) {
    const { tree: brandTree } = buildModeTree(response, collectionId, brand)
    writeTokensFile(brand, diffBrandTree(baseTree, brandTree))
  }
}

function writeTokensFile(mode: string, tree: TokenTree): void {
  const withExtensions = { ...tree, $extensions: { 'com.figma.modeName': mode } }
  const filePath = resolve(TOKENS_DIR, `${mode}.tokens.json`)
  writeFileSync(filePath, `${JSON.stringify(withExtensions, null, 2)}\n`)
  console.log(`Wrote ${filePath}`)
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not set`)
  }
  return value
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
