import { readdirSync, readFileSync, realpathSync, statSync } from 'node:fs'
import { extname, isAbsolute, join, relative, resolve, sep } from 'node:path'

const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage'])
const EXTENSIONS = new Set(['.tsx', '.jsx', '.html', '.ts'])

export function scanSourceFiles(rootDir, collect) {
  const root = realpathSync(resolve(rootDir))
  if (!statSync(root).isDirectory()) throw new Error(`Scan root is not a directory: ${root}`)
  walk(root, root, collect)
}

function walk(rootDir, dir, collect) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue
    const entryPath = canonicalChild(rootDir, join(dir, entry.name))
    if (!entryPath) continue
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walk(rootDir, entryPath, collect)
      continue
    }
    if (!entry.isFile() || !EXTENSIONS.has(extname(entry.name))) continue
    readSource(rootDir, entryPath, collect)
  }
}

function canonicalChild(rootDir, entryPath) {
  let candidate
  try {
    candidate = realpathSync(entryPath)
  } catch {
    return undefined
  }
  const child = relative(rootDir, candidate)
  return child && child !== '..' && !child.startsWith(`..${sep}`) && !isAbsolute(child) ? candidate : undefined
}

function readSource(rootDir, filePath, collect) {
  let text
  try {
    text = readFileSync(filePath, 'utf8')
  } catch {
    return
  }

  collect({
    file: relative(rootDir, filePath).split(sep).join('/'),
    masked: maskSource(text, extname(filePath) === '.html'),
    text,
  })
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

export function readTag(text, start) {
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

export function lineText(text, index) {
  const start = text.lastIndexOf('\n', index - 1) + 1
  const end = text.indexOf('\n', index)
  return text.slice(start, end === -1 ? text.length : end)
}

export function lineAt(text, index) {
  let line = 1
  for (let i = 0; i < index; i++) if (text[i] === '\n') line++
  return line
}

export function toSnippet(raw) {
  return raw.replace(/\s+/g, ' ').replace(/ >/g, '>').trim().slice(0, 240)
}
