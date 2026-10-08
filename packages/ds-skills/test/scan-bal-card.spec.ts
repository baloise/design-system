import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalCard } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-card.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-card-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalCard', () => {
  it('lists React tags and every card import symbol and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalCard, BalCardActions, BalCardTitle } from '@baloise/ds-react'",
        "const _note = 'bal-card'",
        "const _example = '<BalCard flat>Hi</BalCard>'",
        'const _markup = `<BalCard flat />`',
        'const _trailing = true // <BalCard flat />',
        'const _hidden = /* <bal-card></bal-card> */ null',
        'type BalCardinal = string',
        'export function App() {',
        '  return (',
        '    <>',
        '      <BalCard flat color="red">',
        '        <BalCardTitle>Title</BalCardTitle>',
        '        <BalCardContent>Body</BalCardContent>',
        '      </BalCard>',
        '      <BalCard border>Content</BalCard>',
        '    </>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(root, 'Widget.jsx', 'export const Widget = () => <BalCard flat>Hi</BalCard>\n')
    write(root, 'dist/ignored.tsx', '<bal-card flat></bal-card>\n<BalCard flat />\n')
    write(root, 'packed.tsx', 'const _value = 1// <BalCard flat />\n')

    const importLine = "import { BalCard, BalCardActions, BalCardTitle } from '@baloise/ds-react'"

    expect(scanBalCard(root)).toEqual({
      total: 13,
      files: [
        {
          file: 'App.tsx',
          findings: [
            // one finding per card symbol on the import line
            { line: 1, snippet: importLine },
            { line: 1, snippet: importLine },
            { line: 1, snippet: importLine },
            { line: 11, snippet: '<BalCard flat color="red">' },
            { line: 12, snippet: '<BalCardTitle>' },
            { line: 12, snippet: '</BalCardTitle>' },
            { line: 13, snippet: '<BalCardContent>' },
            { line: 13, snippet: '</BalCardContent>' },
            { line: 14, snippet: '</BalCard>' },
            { line: 15, snippet: '<BalCard border>' },
            { line: 15, snippet: '</BalCard>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [
            { line: 1, snippet: '<BalCard flat>' },
            { line: 1, snippet: '</BalCard>' },
          ],
        },
      ],
    })
  })

  it('does not match a longer PascalCase name that merely starts with BalCard', () => {
    const root = createScratchDir()
    write(root, 'types.ts', ['type BalCardinal = string', 'const BalCardish = 1', ''].join('\n'))

    expect(scanBalCard(root)).toEqual({ total: 0, files: [] })
  })

  it('lists Angular template tags, child tags, and the bundle, and skips comments and non-template strings', () => {
    const root = createScratchDir()
    write(
      root,
      'app.component.html',
      [
        '<!-- <bal-card flat></bal-card> -->',
        '<div title="bal-card">text</div>',
        '<p>Mention bal-card in text only.</p>',
        '<bal-card #c flat color="red">',
        '  <bal-card-title>Title</bal-card-title>',
        '  <bal-card-actions position="right">',
        '    <bal-card-button icon="plus">Add</bal-card-button>',
        '  </bal-card-actions>',
        '</bal-card>',
        '<script>',
        "  const decoy = '<bal-card></bal-card>'",
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'inline.component.ts',
      [
        "import { Component } from '@angular/core'",
        "import { BalCardBundle } from '@baloise/ds-angular'",
        "const _decoy = 'bal-card'",
        '// <bal-card flat></bal-card>',
        '@Component({',
        '  imports: [BalCardBundle],',
        '  template: `',
        '    <!-- <bal-card></bal-card> -->',
        '    <bal-card border>Content</bal-card>',
        '  `,',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    expect(scanBalCard(root)).toEqual({
      total: 12,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 4, snippet: '<bal-card #c flat color="red">' },
            { line: 5, snippet: '<bal-card-title>' },
            { line: 5, snippet: '</bal-card-title>' },
            { line: 6, snippet: '<bal-card-actions position="right">' },
            { line: 7, snippet: '<bal-card-button icon="plus">' },
            { line: 7, snippet: '</bal-card-button>' },
            { line: 8, snippet: '</bal-card-actions>' },
            { line: 9, snippet: '</bal-card>' },
          ],
        },
        {
          file: 'inline.component.ts',
          findings: [
            { line: 2, snippet: "import { BalCardBundle } from '@baloise/ds-angular'" },
            { line: 6, snippet: 'imports: [BalCardBundle],' },
            { line: 9, snippet: '<bal-card border>' },
            { line: 9, snippet: '</bal-card>' },
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
        '    <!-- <bal-card flat></bal-card> -->',
        '    <p>bal-card</p>',
        '    <bal-card flat></bal-card>',
        '    <span data-note="<bal-card></bal-card>">x</span>',
        '    <!-- prettier-ignore -->',
        '    <bal-card',
        '      color="red"',
        '      border',
        '    ></bal-card>',
        '    <div>// <bal-card square></bal-card></div>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'nested/page.html', '<bal-card space="small"></bal-card>\n')
    write(root, 'notes.md', '<bal-card></bal-card>\n')

    expect(scanBalCard(root)).toEqual({
      total: 8,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-card flat>' },
            { line: 6, snippet: '</bal-card>' },
            { line: 9, snippet: '<bal-card color="red" border>' },
            { line: 12, snippet: '</bal-card>' },
            { line: 13, snippet: '<bal-card square>' },
            { line: 13, snippet: '</bal-card>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-card space="small">' },
            { line: 1, snippet: '</bal-card>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-card flat></bal-card>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-card flat></bal-card>\n')
      write(root, `src/${dir}/nested.html`, '<BalCard flat />\n')
    }

    expect(scanBalCard(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-card flat>' },
            { line: 1, snippet: '</bal-card>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-card flat></bal-card>\n'
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
            { line: 1, snippet: '<bal-card flat>' },
            { line: 1, snippet: '</bal-card>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('card migration.md', () => {
  it('titles the component card and documents the shape, prop, tag, import, event, and method mapping', () => {
    const migration = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), '../skills/ds-migrate-from-baloise/components/card/migration.md'),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# card\n')).toBe(true)
    for (const phrase of [
      'scan-bal-card.mjs',
      'one yes/no',
      '<ds-card-header>',
      'bal-card-title',
      'bal-card-subtitle',
      'bal-card-content',
      'bal-card-actions',
      'bal-card-button',
      'ds-button',
      'color="info"',
      'wide',
      'bottom-rounded',
      'square',
      'color="dashed"',
      'space="sm"',
      'space="lg"',
      'color="red-dark"',
      'color="red"',
      'color="green-dark"',
      'color="yellow"',
      'align="right"',
      'align="center"',
      'inverted',
      'BalCardBundle',
      '@helvetia-design/angular',
      '@helvetia-design/react',
      'DsCard',
      'any custom events',
      'public methods',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
