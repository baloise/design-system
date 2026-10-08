/**
 * Build script for core — runs Stencil build and cleans up temp folders
 *
 * Run with: node scripts/build-core.mjs
 */
import { execSync } from 'node:child_process'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { generateAngularMeta } from '../packages/core/config/generate-angular-meta.mjs'
import { generateComponentTags } from '../packages/core/config/generate-component-tags.mjs'
import { generateHydrateDefaultsTags } from '../packages/core/config/generate-hydrate-defaults-tags.mjs'

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
// Stencil validates that every path in package.json's "files" array exists before it will build
// at all. "components/" and "hydrate/" come from output targets that stay skipped in docs mode;
// "hydrate-defaults/" comes from the separate tsc pass (buildHydrateDefaults(), below) that always
// runs after Stencil, so on a fresh checkout it doesn't exist yet either. Pre-create all three as
// empty placeholders so Stencil's validation passes regardless of build mode or checkout state.
async function ensurePackageFilesExist() {
  const dirs = IS_DS_DOCUMENTATION ? ['components', 'hydrate', 'hydrate-defaults'] : ['hydrate-defaults']
  await Promise.all(dirs.map(dir => mkdir(join(coreRoot, dir), { recursive: true })))
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
// 3. Build the hydrate-defaults subpath (config/hydrate-defaults.ts -> hydrate-defaults/)
// ============================================================================
// Plain tsc, not Stencil: Stencil's `dist` output target emits an untyped `export *` wrapper
// (dist/index.js -> dist/esm/index.js) that esbuild-based Node loaders (tsx, vite) resolve
// incorrectly for named exports — see docs/adr/0034-ssr-mixed-serialize-shadow-root.md. A
// dedicated tsc pass emits one flat, unambiguous ESM file instead.
async function buildHydrateDefaults() {
  console.log('🧬 Building hydrate-defaults subpath...')
  try {
    execSync('pnpm exec tsc -p tsconfig.hydrate-defaults.json', {
      cwd: coreRoot,
      stdio: 'inherit',
      encoding: 'utf-8',
      env: process.env,
    })
    await patchHydrateDefaultsImport()
    console.log('\x1b[32m✔\x1b[0m hydrate-defaults subpath build complete')
  } catch (err) {
    console.error('✗ hydrate-defaults subpath build failed:', err.message)
    throw err
  }
}

// `config/hydrate-defaults.ts` imports the sibling generated tags file without an extension -
// required so Stencil's CJS-based config loader can `require()` the `.ts` source directly when
// `stencil.bindings.react.ts` loads it (an explicit `.js` specifier there fails: Stencil's loader
// resolves it literally, and only the `.ts` file exists pre-build). Node's ESM runtime has the
// opposite requirement: relative imports need an explicit extension. tsc faithfully preserves the
// extensionless specifier in its output, which only `hydrate-defaults/hydrate-defaults.js` (the
// published subpath) ever actually runs through Node's ESM loader, so patch it there alone -
// matching `packages/react/scripts/patch-server-wrappers.mjs`'s precedent for the same kind of
// post-tsc ESM-interop fixup.
async function patchHydrateDefaultsImport() {
  const file = join(coreRoot, 'hydrate-defaults', 'hydrate-defaults.js')
  const content = await readFile(file, 'utf-8')
  const patched = content.replace("from './hydrate-defaults.generated'", "from './hydrate-defaults.generated.js'")
  if (patched === content) {
    throw new Error(`Expected an extensionless './hydrate-defaults.generated' import in ${file}`)
  }
  await writeFile(file, patched)
}

// ============================================================================
// 4. Generate Angular meta (per-component Inputs/Outputs constants)
// ============================================================================
// `generateAngularMeta()` itself skips when Stencil hasn't (re)written proxies.ts (dev/docs builds) — see
// its own doc comment — so this doesn't need to separately re-derive that same condition from env vars.
async function generateMeta() {
  console.log('🅰️ Generating Angular meta...')
  await generateAngularMeta()
}

// ============================================================================
// 5. Clean up stray output folders
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
    // `stencil.config.ts` imports `stencil.bindings.react.ts`, which imports
    // `config/hydrate-defaults.ts`, which imports this — must exist before Stencil's config even
    // loads, not just before `buildHydrateDefaults()`'s later tsc pass.
    await generateHydrateDefaultsTags(coreRoot)
    buildStencil()
    console.log()
    await buildHydrateDefaults()
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
