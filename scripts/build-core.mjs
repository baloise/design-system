/**
 * Build script for core — runs Stencil build and cleans up temp folders
 *
 * Run with: node scripts/build-core.mjs
 */
import { execSync } from 'node:child_process'
import { rm } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const coreRoot = resolve(__dirname, '../packages/core')

console.log(`
\x1b[35m┃\x1b[0m
\x1b[35m┃\x1b[0m  \x1b[1;37m🧩 Helvetia Design System\x1b[0m
\x1b[35m┃\x1b[0m  \x1b[90m📦 Building Core Package\x1b[0m
\x1b[35m┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
`)

// ============================================================================
// 1. Run Stencil build
// ============================================================================
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
// 2. Clean up stray output folders
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

    buildStencil()
    console.log()

    await cleanUp()

    console.log('\n✨ Core build complete!')
  } catch (err) {
    console.error('\n✗ Build failed:', err)
    process.exit(1)
  }
}

await main()
