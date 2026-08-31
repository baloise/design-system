/**
 * Check that pnpm overrides in package.json and pnpm-workspace.yaml stay in sync.
 *
 * pnpm 11 reads overrides from pnpm-workspace.yaml locally, but Vercel's
 * install only picks up the copy in package.json's "pnpm.overrides"
 * (see docs/adr/0005-duplicate-pnpm-overrides.md). Both must be kept
 * identical or one environment silently resolves a different, possibly
 * vulnerable, dependency version than the other.
 *
 * Run with: node scripts/check-overrides.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from 'js-yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(__dirname, '..')

const pkg = JSON.parse(readFileSync(resolve(workspaceRoot, 'package.json'), 'utf-8'))
const ws = load(readFileSync(resolve(workspaceRoot, 'pnpm-workspace.yaml'), 'utf-8'))

const fromPackageJson = { ...pkg.pnpm?.overrides }
delete fromPackageJson._comment

const fromWorkspaceYaml = ws.overrides ?? {}

const normalize = overrides =>
  JSON.stringify(
    Object.entries(overrides)
      .map(([key, value]) => [key, String(value)])
      .sort(([a], [b]) => a.localeCompare(b)),
  )

if (normalize(fromPackageJson) !== normalize(fromWorkspaceYaml)) {
  console.error(
    'pnpm overrides are out of sync between package.json ("pnpm.overrides") and pnpm-workspace.yaml ("overrides").\n' +
      'Both must be updated together — see docs/adr/0005-duplicate-pnpm-overrides.md.\n\n' +
      `package.json:        ${JSON.stringify(fromPackageJson, null, 2)}\n\n` +
      `pnpm-workspace.yaml:  ${JSON.stringify(fromWorkspaceYaml, null, 2)}`,
  )
  process.exit(1)
}

console.log('pnpm overrides are in sync.')
