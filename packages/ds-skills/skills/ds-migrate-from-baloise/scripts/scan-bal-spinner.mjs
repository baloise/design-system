#!/usr/bin/env node
import { readdirSync, readFileSync, realpathSync } from 'node:fs'
import { extname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage'])
const EXTENSIONS = new Set(['.tsx', '.jsx', '.html', '.ts'])
const USAGE_RE = /<\/?bal-spinner\b|<\/?BalSpinner\b|\bBalSpinner\b/g

export function scanBalSpinner(rootDir) {
  const root = resolve(rootDir)
  const found = []
  walk(root, root, found)
  return group(found)
}

export function run(rootDir, stdout) {
  stdout.write(`${JSON.stringify(scanBalSpinner(rootDir), null, 2)}\n`)
  return 0
}

function group(found) {
  const byFile = new Map()
  for (const finding of found) {
    const list = byFile.get(finding.file) ?? []
    list.push(finding)
    byFile.set(finding.file, list)
  }

  const files = [...byFile.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([file, findings]) => ({
      file,
      findings: findings.sort((a, b) => a.index - b.index).map(({ line, snippet }) => ({ line, snippet })),
    }))

  return {
    total: files.reduce((sum, file) => sum + file.findings.length, 0),
    files,
  }
}

function walk(rootDir, dir, found) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walk(rootDir, join(dir, entry.name), found)
      continue
    }
    if (!entry.isFile() || !EXTENSIONS.has(extname(entry.name))) continue
    collect(rootDir, join(dir, entry.name), found)
  }
}

function collect(rootDir, filePath, found) {
  let text
  try {
    text = readFileSync(filePath, 'utf8')
  } catch {
    return
  }

  const html = extname(filePath) === '.html'
  const masked = maskSource(text, html)
  const file = toPosix(rootDir, filePath)
  USAGE_RE.lastIndex = 0
  let match
  while ((match = USAGE_RE.exec(masked)) !== null) {
    const index = match.index
    const raw = match[0].startsWith('<') ? readTag(text, index) : lineText(text, index)
    found.push({ file, index, line: lineAt(text, index), snippet: toSnippet(raw) })
  }
}

function maskSource(text, html) {
  const mask = Array.from(text)
  let i = 0
  while (i < text.length) {
    if (text.startsWith('<!--', i)) {
      i = blank(mask, i, closeAt(text, '-->', i + 4))
      continue
    }
    if (!html && text.startsWith('//', i)) {
      const end = text.indexOf('\n', i)
      i = blank(mask, i, end === -1 ? text.length : end)
      continue
    }
    if (text.startsWith('/*', i)) {
      i = blank(mask, i, closeAt(text, '*/', i + 2))
      continue
    }

    const quote = text[i]
    if (quote === '"' || quote === "'" || quote === '`') {
      i = !html && isTemplatePropertyString(text, i) ? keepTemplate(text, mask, i) : blankString(text, mask, i)
      continue
    }
    i++
  }
  return mask.join('')
}

function isTemplatePropertyString(text, quoteIndex) {
  let index = quoteIndex - 1
  while (index >= 0 && /\s/.test(text[index])) index--
  if (text[index] !== ':') return false
  index--
  while (index >= 0 && /\s/.test(text[index])) index--
  const end = index + 1
  while (index >= 0 && /[A-Za-z0-9_$]/.test(text[index])) index--
  return text.slice(index + 1, end) === 'template'
}

function keepTemplate(text, mask, start) {
  const quote = text[start]
  let i = start + 1
  while (i < text.length) {
    if (text[i] === '\\') {
      i += 2
      continue
    }
    if (text.startsWith('<!--', i)) {
      i = blank(mask, i, closeAt(text, '-->', i + 4))
      continue
    }
    if ((text[i] === '"' || text[i] === "'") && text[i] !== quote) {
      i = blankString(text, mask, i)
      continue
    }
    if (text[i] === quote) return i + 1
    if (quote !== '`' && text[i] === '\n') return i
    i++
  }
  return i
}

function blankString(text, mask, start) {
  return blank(mask, start, endOfString(text, start))
}

function endOfString(text, start) {
  const quote = text[start]
  let i = start + 1
  while (i < text.length) {
    if (text[i] === '\\') {
      i += 2
      continue
    }
    if (text[i] === quote) return i + 1
    if (quote !== '`' && text[i] === '\n') return i
    i++
  }
  return text.length
}

function blank(mask, from, to) {
  for (let i = from; i < to; i++) {
    if (mask[i] !== '\n') mask[i] = ' '
  }
  return to
}

function closeAt(text, token, from) {
  const end = text.indexOf(token, from)
  return end === -1 ? text.length : end + token.length
}

function readTag(text, start) {
  let i = start + 1
  let quote = ''
  while (i < text.length) {
    const ch = text[i]
    if (quote) {
      if (ch === '\\') {
        i += 2
        continue
      }
      if (ch === quote) quote = ''
      i++
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch
      i++
      continue
    }
    if (ch === '>') return text.slice(start, i + 1)
    i++
  }
  return text.slice(start)
}

function lineText(text, index) {
  const start = text.lastIndexOf('\n', index - 1) + 1
  const end = text.indexOf('\n', index)
  return text.slice(start, end === -1 ? text.length : end)
}

function lineAt(text, index) {
  let line = 1
  for (let i = 0; i < index; i++) if (text[i] === '\n') line++
  return line
}

function toSnippet(raw) {
  return raw.replace(/\s+/g, ' ').replace(/ >/g, '>').trim().slice(0, 240)
}

function toPosix(rootDir, filePath) {
  return relative(rootDir, filePath).split(sep).join('/')
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
