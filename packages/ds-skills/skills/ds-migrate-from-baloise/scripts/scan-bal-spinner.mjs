#!/usr/bin/env node
import { realpathSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { lineAt, lineText, readTag, scanSourceFiles, toSnippet } from './source-scan.mjs'

const USAGE_RE = /<\/?bal-spinner\b|<\/?BalSpinner\b|\bBalSpinner\b/g

export function scanBalSpinner(rootDir) {
  const found = []
  scanSourceFiles(rootDir, ({ file, masked, text }) => collect(file, text, masked, found))
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

function collect(file, text, masked, found) {
  USAGE_RE.lastIndex = 0
  let match
  while ((match = USAGE_RE.exec(masked)) !== null) {
    const index = match.index
    const raw = match[0].startsWith('<') ? readTag(text, index) : lineText(text, index)
    found.push({ file, index, line: lineAt(text, index), snippet: toSnippet(raw) })
  }
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
