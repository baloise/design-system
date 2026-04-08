// scripts/update-bal-content.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const EXTENSIONS = new Set(['.ts', '.tsx', '.scss', '.mdx', '.html'])

function walk(dir, cb) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      // skip node_modules and dist
      if (entry === 'node_modules' || entry === 'dist' || entry === 'www') continue
      walk(full, cb)
    } else if (EXTENSIONS.has(extname(entry))) {
      cb(full)
    }
  }
}

function updateFile(filePath) {
  const original = readFileSync(filePath, 'utf8')
  let content = original

  // 1. styleUrl in @Component: 'bal-button.host.scss' → 'button.host.scss'
  content = content.replace(/styleUrl:\s*'bal-([^']+)'/g, "styleUrl: '$1'")

  // 2. Import paths: from './bal-foo.bar' or from '../bal-foo/bal-bar'
  //    Replace bal- prefix in path segments (not in string HTML templates)
  content = content.replace(/(from\s+['"])((?:[.]{1,2}\/)+)((?:[^'"]*\/)?)(bal-)([^'"]*['"])/g, (match, from, dots, dir, balPrefix, rest) => {
    return `${from}${dots}${dir.replace(/bal-/g, '')}${rest}`
  })
  // Also handle: import '...bal-foo/bal-foo.interfaces'
  content = content.replace(/(import\s+['"])((?:[.]{1,2}\/)+)((?:[^'"]*\/)?)(bal-)([^'"]*['"])/g, (match, imp, dots, dir, balPrefix, rest) => {
    return `${imp}${dots}${dir.replace(/bal-/g, '')}${rest}`
  })

  // 3. @use SCSS paths: @use '...bal-button/bal-button.style'
  content = content.replace(/(@use\s+['"])((?:[^'"]*\/)?)bal-([^/'"]+)\/bal-([^'"]+)(['"])/g, (match, use, prefix, comp1, comp2, quote) => {
    return `${use}${prefix}${comp1}/${comp2}${quote}`
  })

  // 4. PO class declarations: export class BalButton → export class Button
  content = content.replace(/\bexport\s+class\s+Bal([A-Z][a-zA-Z]*)\b/g, 'export class $1')

  // 5. PO class usage: new BalButton( → new Button(  and  import { BalButton
  content = content.replace(/\bnew\s+Bal([A-Z][a-zA-Z]*)\s*\(/g, 'new $1(')
  content = content.replace(/\bimport\s+\{([^}]*)\bBal([A-Z][a-zA-Z]*)\b([^}]*)\}/g, (match, pre, name, post) => {
    return `import {${pre}${name}${post}}`
  })

  // 6. Variable names: const/let/var balFoo → dsFoo (camelCase bal prefix → ds)
  //    Matches: const balButton, let balTag, etc. and usage like balButton.foo
  content = content.replace(/\b(const|let|var)\s+bal([A-Z])/g, '$1 ds$2')
  content = content.replace(/\bbal([A-Z][a-zA-Z]*)([\s.,()\[\]])/g, 'ds$1$2')

  // 7. @Event() declarations: @Event() balClick! → @Event() dsClick!
  //    Only in .tsx files, matches @Event() followed by balXxx
  if (filePath.endsWith('.tsx')) {
    content = content.replace(/(@Event\([^)]*\)\s+)bal([A-Z][a-zA-Z]*)/g, '$1ds$2')
    // this.balClick.emit → this.dsClick.emit
    content = content.replace(/\bthis\.bal([A-Z][a-zA-Z]*)\.emit/g, 'this.ds$1.emit')
    // this.balClick → this.dsClick (other usages)
    content = content.replace(/\bthis\.bal([A-Z][a-zA-Z]*)\b/g, 'this.ds$1')
  }

  // 8. Event strings in tests: spyOnEvent('balClick') → spyOnEvent('dsClick')
  //    Also: addEventListener('balClick', ...) → addEventListener('dsClick', ...)
  content = content.replace(/(spyOnEvent|addEventListener)\s*\(\s*'bal([A-Z][a-zA-Z]*)'/g, "$1('ds$2'")
  // lowercase event names: spyOnEvent('balclick') style
  content = content.replace(/(spyOnEvent|addEventListener)\s*\(\s*'bal([a-z][a-zA-Z]*)'/g, (match, fn, rest) => {
    return `${fn}('ds${rest[0].toUpperCase()}${rest.slice(1)}'`
  })

  // 9. PO index exports: from './bal-accordion.po' → from './accordion.po'
  content = content.replace(/(from\s+['"])\.\/bal-([^'"]+)(['"])/g, "$1./$2$3")

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8')
    console.log(`  updated: ${filePath.replace(root + '/', '')}`)
  }
}

const searchDirs = [
  join(root, 'packages/core/src'),
  join(root, 'packages/playwright/src'),
  join(root, 'packages/styles/src'),
  join(root, 'docs/src'),
]

for (const dir of searchDirs) {
  console.log(`\nScanning: ${dir.replace(root + '/', '')}`)
  walk(dir, updateFile)
}
console.log('\nDone.')
