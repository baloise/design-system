import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalText } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-text.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-text-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalText', () => {
  it('lists React tags and imports and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalButton, BalText, BalTextarea } from '@baloise/ds-react'",
        "const _note = 'bal-text'",
        'const _example = \'<BalText color="primary">Hi</BalText>\'',
        'const _markup = `<BalText bold>Hi</BalText>`',
        'const _trailing = true // <BalText color="white" />',
        'const _hidden = /* <bal-text>Hi</bal-text> */ null',
        'const _palette = type BalTextColor = string',
        'export function App() {',
        '  return (',
        '    <>',
        '      <BalText size="small" bold>Hi</BalText>',
        '      <BalText color="white" inverted heading />',
        '      <BalText color="blue" />',
        '      <BalTextarea>notes</BalTextarea>',
        '      <BalText space="bottom">',
        '      </BalText>',
        '    </>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(root, 'Widget.jsx', "const _label = 'bal-text'\nexport const Widget = () => <BalText inline>Hi</BalText>\n")
    write(root, 'dist/ignored.tsx', '<bal-text>Hi</bal-text>\n<BalText>Hi</BalText>\n')
    write(root, 'packed.tsx', 'const _value = 1// <BalText color="primary" />\n')

    expect(scanBalText(root)).toEqual({
      total: 9,
      files: [
        {
          file: 'App.tsx',
          findings: [
            { line: 1, snippet: "import { BalButton, BalText, BalTextarea } from '@baloise/ds-react'" },
            { line: 11, snippet: '<BalText size="small" bold>' },
            { line: 11, snippet: '</BalText>' },
            { line: 12, snippet: '<BalText color="white" inverted heading />' },
            { line: 13, snippet: '<BalText color="blue" />' },
            { line: 15, snippet: '<BalText space="bottom">' },
            { line: 16, snippet: '</BalText>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [
            { line: 2, snippet: '<BalText inline>' },
            { line: 2, snippet: '</BalText>' },
          ],
        },
      ],
    })
  })

  it('lists Angular template tags and skips comments and non-template strings', () => {
    const root = createScratchDir()
    write(
      root,
      'app.component.html',
      [
        '<!-- <bal-text>Hi</bal-text> -->',
        '<div title="bal-text">text</div>',
        '<p>Mention bal-text in text only.</p>',
        '<bal-text size="small" bold>Hi</bal-text>',
        '<bal-text color="white" inverted>Hi</bal-text>',
        '<bal-text color="blue" space="all">Hi</bal-text>',
        '<bal-textarea>notes</bal-textarea>',
        '<script>',
        "  const decoy = '<bal-text>Hi</bal-text>'",
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'app.component.ts',
      [
        "import { Component } from '@angular/core'",
        "import { BalText, BalTextarea } from '@baloise/ds-angular'",
        "const _decoy = 'bal-text'",
        'const _markup = \'<bal-text color="white">Hi</bal-text>\'',
        '// <bal-text color="white">Hi</bal-text>',
        'void BalTextarea',
        '@Component({',
        "  selector: 'app-root',",
        '  template: `',
        '    <!-- <bal-text>Hi</bal-text> -->',
        '    <bal-text size="lead" color="grey">Hi</bal-text>',
        '  `,',
        '})',
        'export class AppComponent {}',
        '@Component({',
        '  template: \'<bal-text size="block" no-wrap shadow>Hi</bal-text>\',',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    expect(scanBalText(root)).toEqual({
      total: 11,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 4, snippet: '<bal-text size="small" bold>' },
            { line: 4, snippet: '</bal-text>' },
            { line: 5, snippet: '<bal-text color="white" inverted>' },
            { line: 5, snippet: '</bal-text>' },
            { line: 6, snippet: '<bal-text color="blue" space="all">' },
            { line: 6, snippet: '</bal-text>' },
          ],
        },
        {
          file: 'app.component.ts',
          findings: [
            { line: 2, snippet: "import { BalText, BalTextarea } from '@baloise/ds-angular'" },
            { line: 11, snippet: '<bal-text size="lead" color="grey">' },
            { line: 11, snippet: '</bal-text>' },
            { line: 16, snippet: '<bal-text size="block" no-wrap shadow>' },
            { line: 16, snippet: '</bal-text>' },
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
        '    <!-- <bal-text color="white">Hi</bal-text> -->',
        '    <p>bal-text</p>',
        '    <bal-text size="small" bold>Hi</bal-text>',
        '    <bal-text color="white">Hi</bal-text>',
        '    <bal-textarea>notes</bal-textarea>',
        '    <span data-note="<bal-text></bal-text>">x</span>',
        '    <!-- prettier-ignore -->',
        '    <bal-text',
        '      size="lead"',
        '      color="success"',
        '    >Hi</bal-text>',
        '    <div>// <bal-text color="blue">Hi</bal-text></div>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'nested/page.html', '<bal-text inline>Hi</bal-text>\n')
    write(root, 'notes.md', '<bal-text>Hi</bal-text>\n')

    expect(scanBalText(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-text size="small" bold>' },
            { line: 6, snippet: '</bal-text>' },
            { line: 7, snippet: '<bal-text color="white">' },
            { line: 7, snippet: '</bal-text>' },
            { line: 11, snippet: '<bal-text size="lead" color="success">' },
            { line: 14, snippet: '</bal-text>' },
            { line: 15, snippet: '<bal-text color="blue">' },
            { line: 15, snippet: '</bal-text>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-text inline>' },
            { line: 1, snippet: '</bal-text>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-text>Hi</bal-text>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-text>Hi</bal-text>\n')
      write(root, `src/${dir}/nested.html`, '<BalText>Hi</BalText>\n')
    }

    expect(scanBalText(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-text>' },
            { line: 1, snippet: '</bal-text>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-text color="white">Hi</bal-text>\n'
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
            { line: 1, snippet: '<bal-text color="white">' },
            { line: 1, snippet: '</bal-text>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('text migration.md', () => {
  it('titles the component text and documents the prop mapping, confirm gate, and unstaged result', () => {
    const migration = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), '../skills/ds-migrate-from-baloise/components/text/migration.md'),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# text\n')).toBe(true)
    for (const phrase of [
      'scan-bal-text.mjs',
      'one yes/no',
      'size="small"',
      'size="lead"',
      'size="block"',
      'color="white"',
      'color="inverted"',
      'inverted="true"',
      'color="blue"',
      'color="primary"',
      'color="info"',
      'light-blue',
      'primary-light',
      'hovered',
      'pressed',
      'align',
      'subtitle',
      '@helvetia-design/angular',
      '@helvetia-design/react',
      'DsText',
      '<ds-text>',
      'no event changes',
      'no child',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
