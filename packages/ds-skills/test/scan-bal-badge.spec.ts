import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalBadge } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-badge.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-badge-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalBadge', () => {
  it('lists React tags and imports, and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalButton, BalBadge } from '@baloise/ds-react'",
        "const _note = 'bal-badge'",
        'const _example = \'<BalBadge color="grey">2</BalBadge>\'',
        'const _markup = `<BalBadge icon="star"></BalBadge>`',
        'const _trailing = true // <BalBadge color="purple" />',
        'const _hidden = /* <bal-badge>Hi</bal-badge> */ null',
        'export function App() {',
        '  return (',
        '    <>',
        '      <BalBadge color="danger">3</BalBadge>',
        '      <BalBadge icon="star" size="small" />',
        '      <BalBadge position="card">',
        '      </BalBadge>',
        '    </>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(root, 'Widget.jsx', "const _label = 'bal-badge'\nexport const Widget = () => <BalBadge>Hi</BalBadge>\n")
    write(root, 'dist/ignored.tsx', '<bal-badge>Hi</bal-badge>\n<BalBadge>Hi</BalBadge>\n')
    write(root, 'packed.tsx', 'const _value = 1// <BalBadge color="grey" />\n')

    expect(scanBalBadge(root)).toEqual({
      total: 8,
      files: [
        {
          file: 'App.tsx',
          findings: [
            { line: 1, snippet: "import { BalButton, BalBadge } from '@baloise/ds-react'" },
            { line: 10, snippet: '<BalBadge color="danger">' },
            { line: 10, snippet: '</BalBadge>' },
            { line: 11, snippet: '<BalBadge icon="star" size="small" />' },
            { line: 12, snippet: '<BalBadge position="card">' },
            { line: 13, snippet: '</BalBadge>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [
            { line: 2, snippet: '<BalBadge>' },
            { line: 2, snippet: '</BalBadge>' },
          ],
        },
      ],
    })
  })

  it('lists Angular template tags and imports, and skips comments and non-template strings', () => {
    const root = createScratchDir()
    write(
      root,
      'app.component.html',
      [
        '<!-- <bal-badge>Hi</bal-badge> -->',
        '<div title="bal-badge">text</div>',
        '<p>Mention bal-badge in text only.</p>',
        '<bal-badge color="grey">2</bal-badge>',
        '<bal-badge icon="star" size="large"></bal-badge>',
        '<script>',
        "  const decoy = '<bal-badge>Hi</bal-badge>'",
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'app.component.ts',
      [
        "import { Component } from '@angular/core'",
        "import { BalBadge, BalButton } from '@baloise/ds-angular'",
        "const _decoy = 'bal-badge'",
        'const _markup = \'<bal-badge color="grey">2</bal-badge>\'',
        '// <bal-badge color="danger">Hi</bal-badge>',
        'void BalButton',
        '@Component({',
        "  selector: 'app-root',",
        '  template: `',
        '    <!-- <bal-badge>Hi</bal-badge> -->',
        '    <bal-badge color="purple">4</bal-badge>',
        '  `,',
        '})',
        'export class AppComponent {}',
        '@Component({',
        '  template: \'<bal-badge position="tabs">1</bal-badge>\',',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    expect(scanBalBadge(root)).toEqual({
      total: 9,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 4, snippet: '<bal-badge color="grey">' },
            { line: 4, snippet: '</bal-badge>' },
            { line: 5, snippet: '<bal-badge icon="star" size="large">' },
            { line: 5, snippet: '</bal-badge>' },
          ],
        },
        {
          file: 'app.component.ts',
          findings: [
            { line: 2, snippet: "import { BalBadge, BalButton } from '@baloise/ds-angular'" },
            { line: 11, snippet: '<bal-badge color="purple">' },
            { line: 11, snippet: '</bal-badge>' },
            { line: 16, snippet: '<bal-badge position="tabs">' },
            { line: 16, snippet: '</bal-badge>' },
          ],
        },
      ],
    })
  })

  it('lists HTML tags outside src, including a multiline opening tag, and skips markdown', () => {
    const root = createScratchDir()
    write(
      root,
      'index.html',
      [
        '<!doctype html>',
        '<html>',
        '  <body>',
        '    <!-- <bal-badge color="danger">Hi</bal-badge> -->',
        '    <p>bal-badge</p>',
        '    <bal-badge color="grey">2</bal-badge>',
        '    <bal-badge icon="star">1</bal-badge>',
        '    <span data-note="<bal-badge></bal-badge>">x</span>',
        '    <!-- prettier-ignore -->',
        '    <bal-badge',
        '      color="success"',
        '      position="card"',
        '    >3</bal-badge>',
        '    <div>// <bal-badge color="warning">Hi</bal-badge></div>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'nested/page.html', '<bal-badge>Hi</bal-badge>\n')
    write(root, 'notes.md', '<bal-badge>Hi</bal-badge>\n')

    expect(scanBalBadge(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-badge color="grey">' },
            { line: 6, snippet: '</bal-badge>' },
            { line: 7, snippet: '<bal-badge icon="star">' },
            { line: 7, snippet: '</bal-badge>' },
            { line: 10, snippet: '<bal-badge color="success" position="card">' },
            { line: 13, snippet: '</bal-badge>' },
            { line: 14, snippet: '<bal-badge color="warning">' },
            { line: 14, snippet: '</bal-badge>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-badge>' },
            { line: 1, snippet: '</bal-badge>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-badge>Hi</bal-badge>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-badge>Hi</bal-badge>\n')
      write(root, `src/${dir}/nested.html`, '<BalBadge>Hi</BalBadge>\n')
    }

    expect(scanBalBadge(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-badge>' },
            { line: 1, snippet: '</bal-badge>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-badge color="grey">2</bal-badge>\n'
    write(root, 'index.html', contents)
    let text = ''

    const code = run(root, {
      write(chunk: string) {
        text += chunk
      },
    })

    expect(code).toBe(0)
    expect(JSON.parse(text)).toEqual({
      total: 2,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 1, snippet: '<bal-badge color="grey">' },
            { line: 1, snippet: '</bal-badge>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('badge migration.md', () => {
  it('titles the component badge and documents the prop and import mapping', () => {
    const migration = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), '../skills/ds-migrate-from-baloise/components/badge/migration.md'),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# badge\n')).toBe(true)
    for (const phrase of [
      'scan-bal-badge.mjs',
      'one yes/no',
      'icon',
      'size="sm"',
      'size="lg"',
      'color="disabled"',
      'color="danger"',
      'color="warning"',
      'color="success"',
      'color="purple"',
      'position="card"',
      'position="button"',
      'position="tabs"',
      'pulse',
      '@helvetia-design/angular',
      '@helvetia-design/react',
      'DsBadge',
      '<ds-badge>',
      'any custom events',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
