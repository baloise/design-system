# Remove `bal-` Prefix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the `bal-`/`Bal` prefix from component folders, files, PO classes, Storybook entries, namespaces, event names and variable names — while keeping HTML tag names (`bal-button` etc.) unchanged.

**Architecture:** Three staged scripts handle the mechanical work: (1) rename folders and files, (2) update file contents (imports, styleUrls, class names, variable names, event names), (3) consolidate `BalProps`/`BalEvents` namespaces into `DS`. Two manual steps update `interfaces.d.ts` and `packages/styles/src/generated/components.scss`. Snapshot directories are renamed by the first script; PNG baselines will need regeneration.

**Tech Stack:** Node.js scripts (vanilla `fs`, `path`), TypeScript source files, Stencil.js components, Playwright PO files, Storybook MDX/stories.

---

## Files Overview

| File | Role |
|---|---|
| `scripts/rename-bal-files.mjs` | Stage 1: rename folders + files |
| `scripts/update-bal-content.mjs` | Stage 2: update file contents |
| `scripts/consolidate-namespaces.mjs` | Stage 3: merge BalProps/BalEvents → DS |
| `packages/core/src/interfaces.d.ts` | Manual: merge namespace declarations + update paths |
| `packages/styles/src/generated/components.scss` | Manual: update `@use` paths |

---

### Task 1: Write the folder and file rename script

**Files:**
- Create: `scripts/rename-bal-files.mjs`

- [ ] **Step 1: Create the script**

```js
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
    if (statSync(full).isDirectory() && entry.startsWith('bal-')) {
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
```

- [ ] **Step 2: Run the script**

```bash
node scripts/rename-bal-files.mjs
```

Expected: output lists every renamed folder and file (e.g. `dir: bal-button → button`, `file: bal-button.tsx → button.tsx`). No errors.

- [ ] **Step 3: Verify a sample component**

```bash
ls packages/core/src/components/button/
```

Expected output:
```
button-group   button.host.scss   button.interfaces.ts   button.style.scss   button.tsx   test
```

- [ ] **Step 4: Verify PO files**

```bash
ls packages/playwright/src/lib/components/
```

Expected: `button.po.ts`, `tag.po.ts`, etc. — no more `bal-*.po.ts` files.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: rename bal- prefixed folders and files to drop bal- prefix"
```

---

### Task 2: Write the content update script

**Files:**
- Create: `scripts/update-bal-content.mjs`

- [ ] **Step 1: Create the script**

```js
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

  // 6. Variable names: const/let/var balFoo → dsF oo (camelCase bal prefix → ds)
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
  // lowercase event names too: spyOnEvent('balclick') — unlikely but safe
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
```

- [ ] **Step 2: Run the script**

```bash
node scripts/update-bal-content.mjs
```

Expected: list of updated files. No errors.

- [ ] **Step 3: Spot-check bal-button → button**

```bash
head -15 packages/core/src/components/button/button.tsx
```

Expected: `styleUrl: 'button.host.scss'` (not `bal-button.host.scss`). The `@Component({ tag: 'bal-button' })` tag value must still say `bal-button`.

- [ ] **Step 4: Spot-check events in button.tsx**

```bash
grep "@Event\|this\.ds\|this\.bal" packages/core/src/components/button/button.tsx
```

Expected: `@Event() dsClick!`, `@Event() dsBlur!`, `this.dsClick.emit(ev)` — no remaining `balClick`, `balBlur`, etc.

- [ ] **Step 5: Spot-check a test file**

```bash
grep "spyOnEvent\|new Button\|new Bal\|dsButton\|balButton" packages/core/src/components/button/test/button.component.play.ts
```

Expected: `new Button(`, `dsButton.click()`, `spyOnEvent('dsClick')` — no `BalButton`, `balButton`, `balClick`.

- [ ] **Step 6: Spot-check PO index**

```bash
cat packages/playwright/src/lib/components/index.ts | head -5
```

Expected: `export * from './button.po'` — no `bal-` prefixes.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: update all content references to remove bal- prefix"
```

---

### Task 3: Write the namespace consolidation script

**Files:**
- Create: `scripts/consolidate-namespaces.mjs`

- [ ] **Step 1: Create the script**

```js
// scripts/consolidate-namespaces.mjs
// Merges `namespace BalProps { ... }` and `namespace BalEvents { ... }` into
// a single `namespace DS { ... }` and strips `Bal` prefix from all type names.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, extname, dirname } from 'path'
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

// Brace-balanced block extractor
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

  // Collect all bodies, strip leading/trailing whitespace
  const combinedBodies = blocks.map(b => b.body.trim()).filter(Boolean).join('\n\n  ')

  // Remove all original namespace blocks from source (from last to first)
  const sorted = [...blocks].sort((a, b) => b.start - a.start)
  for (const block of sorted) {
    source = source.slice(0, block.start) + source.slice(block.end)
  }

  // Build merged DS namespace
  const dsBlock = `namespace DS {\n  ${combinedBodies}\n}`

  // Append DS block before the last empty lines
  source = source.trimEnd() + '\n\n' + dsBlock + '\n'

  // Strip Bal prefix from type/interface names.
  // Negative lookbehind protects HTMLBal* (Stencil-generated element types that must stay).
  source = source.replace(/(?<!HTML)\bBal([A-Z][a-zA-Z]*)\b/g, '$1')

  if (source !== original) {
    writeFileSync(filePath, source, 'utf8')
    console.log(`  updated: ${filePath.replace(root + '/', '')}`)
  }
}

walk(join(root, 'packages/core/src/components'), processFile)
console.log('\nDone.')
```

- [ ] **Step 2: Run the script**

```bash
node scripts/consolidate-namespaces.mjs
```

Expected: list of updated `*.interfaces.ts` files.

- [ ] **Step 3: Spot-check button.interfaces.ts**

```bash
cat packages/core/src/components/button/button.interfaces.ts
```

Expected: a single `namespace DS { ... }` block containing all types and interfaces previously in both `BalProps` and `BalEvents`. No `BalProps` or `BalEvents` blocks remain. Type names like `ButtonColor`, `ButtonSize`, `ButtonCustomEvent`, `ButtonClickDetail` — no `Bal` prefix.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: merge BalProps/BalEvents into DS namespace and strip Bal prefix from type names"
```

---

### Task 4: Update all DS.* usages in component source files

After the namespace rename, all `BalProps.BalButtonColor` references must become `DS.ButtonColor` and all `BalEvents.BalButtonClickDetail` references must become `DS.ButtonClickDetail`.

**Files:**
- Modify: all `*.tsx` and `*.ts` under `packages/core/src/components/`

- [ ] **Step 1: Replace BalProps.Bal* usages**

```bash
find packages/core/src/components -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/BalProps\.Bal/DS./g'
```

- [ ] **Step 2: Replace BalEvents.Bal* usages**

```bash
find packages/core/src/components -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/BalEvents\.Bal/DS./g'
```

- [ ] **Step 3: Spot-check button.tsx**

```bash
grep "DS\.\|BalProps\.\|BalEvents\." packages/core/src/components/button/button.tsx | head -10
```

Expected: only `DS.ButtonColor`, `DS.ButtonSize`, `DS.ButtonClickDetail`, etc. — no `BalProps.` or `BalEvents.` references.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: replace BalProps.*/BalEvents.* with DS.* in component source files"
```

---

### Task 5: Update interfaces.d.ts

**Files:**
- Modify: `packages/core/src/interfaces.d.ts`

- [ ] **Step 1: Read the current file**

```bash
cat packages/core/src/interfaces.d.ts
```

- [ ] **Step 2: Replace the two namespace declarations with one DS declaration**

Replace this block at the top of the file:
```ts
declare namespace BalProps {}

declare namespace BalEvents {}
```

With:
```ts
declare namespace DS {}
```

- [ ] **Step 3: Update all import paths to strip bal- prefix**

```bash
sed -i '' "s|'./components/bal-\([^/]*\)/bal-\([^']*\)'|'./components/\1/\2'|g" packages/core/src/interfaces.d.ts
```

- [ ] **Step 4: Verify**

```bash
grep "BalProps\|BalEvents\|bal-" packages/core/src/interfaces.d.ts | head -10
```

Expected: no matches. All paths should be like `'./components/button/button.interfaces'`, and only `declare namespace DS {}` at the top.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/interfaces.d.ts
git commit -m "refactor: merge namespace declarations and update import paths in interfaces.d.ts"
```

---

### Task 6: Update packages/styles/src/generated/components.scss

**Files:**
- Modify: `packages/styles/src/generated/components.scss`

- [ ] **Step 1: Update all @use paths**

```bash
sed -i '' 's|/bal-\([^/]*\)/bal-\([^;]*\)\.style\.scss|/\1/\2.style.scss|g' packages/styles/src/generated/components.scss
```

- [ ] **Step 2: Verify**

```bash
grep "bal-" packages/styles/src/generated/components.scss | head -5
```

Expected: no matches — all paths now like `@use '…/button/button.style.scss'`.

- [ ] **Step 3: Commit**

```bash
git add packages/styles/src/generated/components.scss
git commit -m "refactor: update style import paths in generated components.scss"
```

---

### Task 7: Verify the build compiles

- [ ] **Step 1: Run unit tests**

```bash
npm test
```

Expected: all tests pass. If any test fails due to a missed `balFoo` → `dsFoo` variable or import path rename, fix the specific file and re-run.

- [ ] **Step 2: Check for any remaining BalProps/BalEvents references**

```bash
grep -r "BalProps\.\|BalEvents\." packages/core/src --include="*.ts" --include="*.tsx"
```

Expected: no output.

- [ ] **Step 3: Check for accidental tag renames**

```bash
grep -r "tag: 'button'" packages/core/src/components --include="*.tsx"
```

Expected: no output — all `@Component` decorators must still say `tag: 'bal-button'`, etc.

- [ ] **Step 4: Fix any remaining issues found, commit**

```bash
git add -A
git commit -m "refactor: fix remaining bal- prefix references found during build verification"
```

---

### Task 8: Regenerate visual snapshots

Visual snapshot PNG baselines are named after Playwright test descriptions. Since test file names changed (and some test `describe` labels may reference the old name), regenerate them.

- [ ] **Step 1: Delete old snapshot directories**

```bash
find packages/core/src/components -name "*.visual.play.ts-snapshots" -type d -exec rm -rf {} + 2>/dev/null; true
```

- [ ] **Step 2: Run visual tests in update mode to regenerate baselines**

```bash
npm run e2e -- --update-snapshots
```

Expected: all visual tests pass and new baseline PNGs are created.

- [ ] **Step 3: Commit the new snapshots**

```bash
git add -A
git commit -m "test: regenerate visual snapshots after bal- prefix removal"
```
