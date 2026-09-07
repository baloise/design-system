/**
 * Generates apps/toky/src/tokens/code-usage.generated.json — for every Base
 * token (Global/Alias/Device/Component layers), how many compiled CSS files in
 * packages/core and packages/css reference it as a CSS custom property.
 * Used by Toky's token editor to flag dead tokens (see
 * docs/plans/toky-code-usage-plan.md).
 *
 * Scans *built* CSS, not .scss source — SCSS loops (`@each`/`@for`) generate
 * variable references dynamically via interpolation, so a source file rarely
 * contains the literal `var(--ds-...)` text even when it uses the token at
 * runtime. The compiled output has every loop already expanded into literal
 * `var()` calls.
 *
 * Run with: pnpm tokens:usage
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectBaseTokens, computeUsage } from './token-usage/lib/scan.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, '..')
const docsTokensPath = resolve(workspaceRoot, 'packages/tokens/dist/docs/base.tokens.json')
const outputPath = resolve(workspaceRoot, 'apps/toky/src/tokens/code-usage.generated.json')

const SCAN_ROOTS = [
  // One compiled .css per source component (mirrors packages/core/src's structure),
  // with every @each/@for loop already expanded.
  { package: 'core', dir: resolve(workspaceRoot, 'packages/core/dist/collection'), patterns: ['**/*.css'] },
  // packages/css only ships pre-bundled CSS. design-system(.local)(.min).css are
  // just base+components+utilities concatenated — scanning them too would only
  // duplicate locations, not add information, so they're excluded.
  {
    package: 'css',
    dir: resolve(workspaceRoot, 'packages/css/dist/css'),
    patterns: ['base.css', 'components.css', 'utilities.css'],
  },
]

console.log('🔨 Rebuilding packages/tokens, packages/core, and packages/css...')
execSync('pnpm tokens', { cwd: workspaceRoot, stdio: 'inherit' })
execSync('pnpm core', { cwd: workspaceRoot, stdio: 'inherit' })
execSync('pnpm css', { cwd: workspaceRoot, stdio: 'inherit' })

console.log('📖 Reading packages/tokens/dist/docs/base.tokens.json...')
const docsJson = JSON.parse(readFileSync(docsTokensPath, 'utf-8'))
const tokens = collectBaseTokens(docsJson)
console.log(`   ${tokens.length} Base tokens found.`)

console.log('🔍 Scanning compiled CSS in packages/core and packages/css for var(--ds-...) usage...')
const glob = (await import('fast-glob')).default
const files = []
for (const { package: pkg, dir, patterns } of SCAN_ROOTS) {
  const cssFiles = await glob(patterns, { cwd: dir, absolute: true })
  for (const absolutePath of cssFiles) {
    files.push({
      package: pkg,
      file: relative(dir, absolutePath),
      content: readFileSync(absolutePath, 'utf-8'),
    })
  }
}
console.log(`   ${files.length} compiled .css files scanned.`)

const usage = computeUsage(tokens, files)

const sortedUsage = Object.fromEntries(Object.entries(usage).sort(([a], [b]) => a.localeCompare(b)))
writeFileSync(outputPath, `${JSON.stringify(sortedUsage, null, 2)}\n`)
console.log(`✅ Wrote ${relative(workspaceRoot, outputPath)}`)
