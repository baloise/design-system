// scripts/rename-bal-files.mjs
import { readdirSync, renameSync, statSync, existsSync } from 'fs'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function stripBal(name) {
  if (name.startsWith('bal-')) return name.slice(4)
  return name
}

function renameDir(dir) {
  // recurse into children first (deepest first)
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      renameDir(full)
    }
  }
  // rename files in this dir
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (!statSync(full).isDirectory() && entry.startsWith('bal-')) {
      const newName = stripBal(entry)
      const target = join(dir, newName)
      if (!existsSync(target)) {
        renameSync(full, target)
        console.log(`  file: ${entry} → ${newName}`)
      }
    }
  }
  // rename this dir itself if it starts with bal-
  const name = basename(dir)
  if (name.startsWith('bal-')) {
    const parent = dirname(dir)
    const newName = stripBal(name)
    const target = join(parent, newName)
    if (!existsSync(target)) {
      renameSync(dir, target)
      console.log(`  dir:  ${name} → ${newName}`)
    }
  }
}

const targets = [
  join(root, 'packages/core/src/components'),
  join(root, 'packages/playwright/src/lib/components'),
  join(root, 'docs/src/components'),
]

for (const target of targets) {
  console.log(`\nProcessing: ${target}`)
  for (const entry of readdirSync(target)) {
    const full = join(target, entry)
    if (statSync(full).isDirectory()) {
      renameDir(full)
    } else if (!statSync(full).isDirectory() && entry.startsWith('bal-')) {
      const newName = stripBal(entry)
      const dest = join(target, newName)
      if (!existsSync(dest)) {
        renameSync(full, dest)
        console.log(`  file: ${entry} → ${newName}`)
      }
    }
  }
}
console.log('\nDone.')
