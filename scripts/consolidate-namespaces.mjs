// scripts/consolidate-namespaces.mjs
// Merges `namespace BalProps { ... }` and `namespace BalEvents { ... }` into
// a single `namespace DS { ... }` and strips `Bal` prefix from all type names.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function walk(dir, cb) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === 'dist' || entry === 'www') continue
      walk(full, cb)
    } else if (entry.endsWith('.interfaces.ts') || entry.endsWith('.interfaces.tsx')) {
      cb(full)
    }
  }
}

// Brace-balanced block extractor: finds the closing brace matching the open brace at startIndex
function extractBlock(source, startIndex) {
  let depth = 0
  let i = startIndex
  while (i < source.length) {
    if (source[i] === '{') depth++
    if (source[i] === '}') {
      depth--
      if (depth === 0) return i
    }
    i++
  }
  return -1
}

function processFile(filePath) {
  let source = readFileSync(filePath, 'utf8')
  const original = source

  // Find all namespace BalProps { } and namespace BalEvents { } blocks
  const blocks = []
  const namespaceRe = /namespace\s+(BalProps|BalEvents)\s*\{/g
  let m
  while ((m = namespaceRe.exec(source)) !== null) {
    const openBrace = m.index + m[0].length - 1
    const closeBrace = extractBlock(source, openBrace)
    if (closeBrace === -1) continue
    blocks.push({
      start: m.index,
      end: closeBrace + 1,
      body: source.slice(openBrace + 1, closeBrace),
    })
  }

  if (blocks.length === 0) return

  // Collect all bodies
  const combinedBodies = blocks.map(b => b.body.trim()).filter(Boolean).join('\n\n  ')

  // Remove all original namespace blocks from source (last to first to preserve offsets)
  const sorted = [...blocks].sort((a, b) => b.start - a.start)
  for (const block of sorted) {
    source = source.slice(0, block.start) + source.slice(block.end)
  }

  // Build merged DS namespace
  const dsBlock = `namespace DS {\n  ${combinedBodies}\n}`
  source = source.trimEnd() + '\n\n' + dsBlock + '\n'

  // Strip Bal prefix from type/interface names — but NOT from HTMLBal* (Stencil-generated)
  source = source.replace(/(?<!HTML)\bBal([A-Z][a-zA-Z]*)\b/g, '$1')

  if (source !== original) {
    writeFileSync(filePath, source, 'utf8')
    console.log(`  updated: ${filePath.replace(root + '/', '')}`)
  }
}

walk(join(root, 'packages/core/src/components'), processFile)
console.log('\nDone.')
