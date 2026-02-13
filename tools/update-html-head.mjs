#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'

async function walk(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const d of dirents) {
    const res = path.resolve(dir, d.name)
    if (d.isDirectory()) {
      files.push(...(await walk(res)))
    } else if (d.isFile() && res.endsWith('.html')) {
      files.push(res)
    }
  }
  return files
}

const newHead = `<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link rel="stylesheet" href="/assets/section.css" />
    <link rel="stylesheet" href="/assets/styles/baloise-design-system.local.min.css" />

    <script type="module" src="/build/baloise-design-system.esm.js"></script>
    <script nomodule src="/build/baloise-design-system.js"></script>
  </head>`

function updateContent(content) {
  const headRegex = /<head[\s\S]*?<\/head>/i
  if (headRegex.test(content)) {
    return content.replace(headRegex, newHead)
  }
  const htmlOpenRegex = /<html[^>]*>/i
  if (htmlOpenRegex.test(content)) {
    return content.replace(htmlOpenRegex, m => `${m}\n${newHead}\n`)
  }
  const doctypeRegex = /<!doctype html>/i
  if (doctypeRegex.test(content)) {
    return content.replace(doctypeRegex, m => `${m}\n${newHead}\n`)
  }
  return `${newHead}\n${content}`
}

async function main() {
  const root = path.join(process.cwd(), 'packages', 'core', 'src')
  const files = await walk(root)
  let changed = 0
  for (const file of files) {
    let content
    try {
      content = await fs.readFile(file, 'utf8')
    } catch (e) {
      console.error('Failed to read', file, e)
      continue
    }
    const updated = updateContent(content)
    if (updated !== content) {
      try {
        await fs.writeFile(file, updated)
        changed++
        console.log('Updated head in', path.relative(root, file))
      } catch (e) {
        console.error('Failed to write', file, e)
      }
    }
  }
  console.log(`Processed ${files.length} HTML files; updated ${changed}.`)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
