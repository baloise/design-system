/**
 * Build script for core — runs Stencil build and cleans up temp folders
 *
 * Run with: node scripts/build-core.mjs
 */
import { execSync } from 'node:child_process'
import { mkdir, rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { generateAngularMeta } from '../packages/core/config/generate-angular-meta.mjs'
import { generateComponentTags } from '../packages/core/config/generate-component-tags.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const coreRoot = resolve(__dirname, '../packages/core')
const IS_DS_DOCUMENTATION = process.env.DS_DOCUMENTATION === 'true'

console.log(`
\x1b[35m┃\x1b[0m
\x1b[35m┃\x1b[0m  \x1b[1;37m🧩 Helvetia Design System\x1b[0m
\x1b[35m┃\x1b[0m  \x1b[90m📦 Building Core Package\x1b[0m
\x1b[35m┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
`)

// ============================================================================
// 1. Run Stencil build
// ============================================================================
// Documentation builds only run the `dist` output target (see stencil.config.ts) so Storybook's
// preview can import `@helvetia-design/core` directly, but Stencil still validates that every path in
// package.json's "files" array exists once any dist-collection target is active — including
// "components/" and "hydrate/", which come from output targets that stay skipped in docs mode.
// Pre-create them as empty placeholders so that validation passes.
async function ensurePackageFilesExist() {
  if (!IS_DS_DOCUMENTATION) return
  await Promise.all([
    mkdir(join(coreRoot, 'components'), { recursive: true }),
    mkdir(join(coreRoot, 'hydrate'), { recursive: true }),
  ])
}

function buildStencil() {
  console.log('🏗️ Running Stencil build...')
  try {
    execSync('pnpm exec stencil build', {
      cwd: coreRoot,
      stdio: 'inherit',
      encoding: 'utf-8',
      env: process.env,
    })
    console.log('\x1b[32m✔\x1b[0m Stencil build complete')
  } catch (err) {
    console.error('✗ Stencil build failed:', err.message)
    throw err
  }
}

// ============================================================================
// 3. Generate Angular meta (per-component Inputs/Outputs constants)
// ============================================================================
// `generateAngularMeta()` itself skips when Stencil hasn't (re)written proxies.ts (dev/docs builds) — see
// its own doc comment — so this doesn't need to separately re-derive that same condition from env vars.
async function generateMeta() {
  console.log('🅰️ Generating Angular meta...')
  await generateAngularMeta()
}

// ============================================================================
// 4. Clean up stray output folders
// ============================================================================
async function cleanUp() {
  console.log('🧹 Cleaning up temporary folders...')
  const foldersToClean = [join(coreRoot, 'icons'), join(coreRoot, 'playwright')]

  for (const folder of foldersToClean) {
    try {
      await rm(folder, { recursive: true, force: true })
    } catch (err) {
      console.warn(`⚠ Could not remove ${folder}:`, err.message)
    }
  }

  console.log('\x1b[32m✔\x1b[0m Cleanup complete')
}

// ============================================================================
// Main
// ============================================================================
async function main() {
  try {
    console.log('🏗️ Building core...\n')

    await ensurePackageFilesExist()
    // `src/global/initialize.ts` imports the tags constant generated here — Stencil's own
    // regeneration (stencil.config.ts's `watch-external` plugin) only fires during the bundle
    // phase, too late for a fresh checkout where this gitignored file doesn't exist yet.
    await generateComponentTags(coreRoot)
    buildStencil()
    console.log()

    // Independent of each other (meta is derived from proxies.ts, cleanup just removes stray folders), so
    // run them concurrently instead of paying the sum of both durations.
    await Promise.all([generateMeta(), cleanUp()])

    console.log('\n✨ Core build complete!')
  } catch (err) {
    console.error('\n✗ Build failed:', err)
    process.exit(1)
  }
}

await main()
