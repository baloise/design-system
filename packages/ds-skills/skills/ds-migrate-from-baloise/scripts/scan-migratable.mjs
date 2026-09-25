#!/usr/bin/env node
import { existsSync, readdirSync, realpathSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { scanSourceFiles } from './source-scan.mjs'

const COMPONENT_RE =
  /<\/?bal-([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\b|<\/?Bal([A-Z][A-Za-z0-9]*)\b|\bBal([A-Z][A-Za-z0-9]*)\b/g
const COMPONENTS_DIR = join(dirname(fileURLToPath(import.meta.url)), '../components')

export function componentNameToSlug(name) {
  return name
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export function scanMigratable(rootDir) {
  const available = availableMigrations()
  const totals = new Map()

  scanSourceFiles(rootDir, ({ masked }) => {
    COMPONENT_RE.lastIndex = 0
    let match
    while ((match = COMPONENT_RE.exec(masked)) !== null) {
      const name = match[1] ?? componentNameToSlug(match[2] ?? match[3])
      totals.set(name, (totals.get(name) ?? 0) + 1)
    }
  })

  const used = [...totals.entries()]
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return {
    suggested: used.filter(component => available.has(component.name)),
    notYet: used.filter(component => !available.has(component.name)),
  }
}

export function run(rootDir, stdout) {
  stdout.write(`${JSON.stringify(scanMigratable(rootDir), null, 2)}\n`)
  return 0
}

function availableMigrations() {
  const migrations = new Set()
  let entries
  try {
    entries = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  } catch {
    return migrations
  }

  for (const entry of entries) {
    if (entry.isDirectory() && existsSync(join(COMPONENTS_DIR, entry.name, 'migration.md'))) {
      migrations.add(entry.name)
    }
  }
  return migrations
}

function isMainModule() {
  const entry = process.argv[1]
  if (!entry) return false
  try {
    return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(resolve(entry))
  } catch {
    return pathToFileURL(resolve(entry)).href === import.meta.url
  }
}

if (isMainModule()) {
  const root = process.argv[2] ? resolve(process.argv[2]) : process.cwd()
  try {
    process.exit(run(root, process.stdout))
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
    process.exit(1)
  }
}
