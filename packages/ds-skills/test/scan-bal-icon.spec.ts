import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalIcon } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-icon.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-icon-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalIcon', () => {
  it('lists React tags and imports and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalButton, BalIcon } from '@baloise/ds-react'",
        "const _note = 'bal-icon'",
        'const _example = \'<BalIcon name="plus" />\'',
        'const _markup = `<BalIcon name="check" />`',
        'const _trailing = true // <BalIcon color="white" />',
        'const _hidden = /* <bal-icon name="plus"></bal-icon> */ null',
        'const _palette = type BalIconColor = string',
        'export function App() {',
        '  return (',
        '    <>',
        '      <BalIcon name="plus" size="small" />',
        '      <BalIcon name="alert" color="white" inverted tile />',
        '      <BalIcon color="blue" />',
        '      <BalIcon size="x-large">',
        '      </BalIcon>',
        '    </>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(
      root,
      'Widget.jsx',
      'const _label = \'bal-icon\'\nexport const Widget = () => <BalIcon name="check" inline />\n',
    )
    write(root, 'dist/ignored.tsx', '<bal-icon name="plus"></bal-icon>\n<BalIcon name="plus" />\n')
    write(root, 'packed.tsx', 'const _value = 1// <BalIcon name="plus" />\n')

    expect(scanBalIcon(root)).toEqual({
      total: 7,
      files: [
        {
          file: 'App.tsx',
          findings: [
            { line: 1, snippet: "import { BalButton, BalIcon } from '@baloise/ds-react'" },
            { line: 11, snippet: '<BalIcon name="plus" size="small" />' },
            { line: 12, snippet: '<BalIcon name="alert" color="white" inverted tile />' },
            { line: 13, snippet: '<BalIcon color="blue" />' },
            { line: 14, snippet: '<BalIcon size="x-large">' },
            { line: 15, snippet: '</BalIcon>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [{ line: 2, snippet: '<BalIcon name="check" inline />' }],
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
        '<!-- <bal-icon name="plus"></bal-icon> -->',
        '<div title="bal-icon">icon</div>',
        '<p>Mention bal-icon in text only.</p>',
        '<bal-icon name="plus" size="small"></bal-icon>',
        '<bal-icon name="info" color="white" inverted></bal-icon>',
        '<bal-icon color="blue" tile tileColor="purple"></bal-icon>',
        '<script>',
        '  const decoy = \'<bal-icon name="plus"></bal-icon>\'',
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'app.component.ts',
      [
        "import { Component } from '@angular/core'",
        "import { updateBalIcons } from '@baloise/ds-angular'",
        "const _decoy = 'bal-icon'",
        'const _markup = \'<bal-icon color="white"></bal-icon>\'',
        '// <bal-icon color="white"></bal-icon>',
        'void updateBalIcons',
        '@Component({',
        "  selector: 'app-root',",
        '  template: `',
        '    <!-- <bal-icon name="plus"></bal-icon> -->',
        '    <bal-icon name="check" size="medium" color="grey"></bal-icon>',
        '  `,',
        '})',
        'export class AppComponent {}',
        '@Component({',
        '  template: \'<bal-icon name="caret-down" turn shadow></bal-icon>\',',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    expect(scanBalIcon(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 4, snippet: '<bal-icon name="plus" size="small">' },
            { line: 4, snippet: '</bal-icon>' },
            { line: 5, snippet: '<bal-icon name="info" color="white" inverted>' },
            { line: 5, snippet: '</bal-icon>' },
            { line: 6, snippet: '<bal-icon color="blue" tile tileColor="purple">' },
            { line: 6, snippet: '</bal-icon>' },
          ],
        },
        {
          file: 'app.component.ts',
          findings: [
            { line: 11, snippet: '<bal-icon name="check" size="medium" color="grey">' },
            { line: 11, snippet: '</bal-icon>' },
            { line: 16, snippet: '<bal-icon name="caret-down" turn shadow>' },
            { line: 16, snippet: '</bal-icon>' },
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
        '    <!-- <bal-icon color="white"></bal-icon> -->',
        '    <p>bal-icon</p>',
        '    <bal-icon name="plus" size="small"></bal-icon>',
        '    <bal-icon color="white"></bal-icon>',
        '    <span data-note="<bal-icon></bal-icon>">x</span>',
        '    <!-- prettier-ignore -->',
        '    <bal-icon',
        '      name="plus"',
        '      color="success"',
        '    ></bal-icon>',
        '    <div>// <bal-icon color="blue"></bal-icon></div>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'nested/page.html', '<bal-icon name="check" inline></bal-icon>\n')
    write(root, 'notes.md', '<bal-icon name="plus"></bal-icon>\n')

    expect(scanBalIcon(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-icon name="plus" size="small">' },
            { line: 6, snippet: '</bal-icon>' },
            { line: 7, snippet: '<bal-icon color="white">' },
            { line: 7, snippet: '</bal-icon>' },
            { line: 10, snippet: '<bal-icon name="plus" color="success">' },
            { line: 13, snippet: '</bal-icon>' },
            { line: 14, snippet: '<bal-icon color="blue">' },
            { line: 14, snippet: '</bal-icon>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-icon name="check" inline>' },
            { line: 1, snippet: '</bal-icon>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-icon name="plus"></bal-icon>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-icon name="plus"></bal-icon>\n')
      write(root, `src/${dir}/nested.html`, '<BalIcon name="plus" />\n')
    }

    expect(scanBalIcon(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-icon name="plus">' },
            { line: 1, snippet: '</bal-icon>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-icon color="white"></bal-icon>\n'
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
            { line: 1, snippet: '<bal-icon color="white">' },
            { line: 1, snippet: '</bal-icon>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('icon migration.md', () => {
  it('titles the component icon and documents the prop mapping, confirm gate, and unstaged result', () => {
    const migration = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), '../skills/ds-migrate-from-baloise/components/icon/migration.md'),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# icon\n')).toBe(true)
    for (const phrase of [
      'scan-bal-icon.mjs',
      'one yes/no',
      'alert-triangle',
      'info-circle',
      'size="sm"',
      'size="md"',
      'size="lg"',
      'size="xl"',
      'x-small',
      'xx-large',
      'color="white"',
      'inverted="true"',
      'color="blue"',
      'light-blue',
      'tileColor',
      'colorHovered',
      'colorPressed',
      'src',
      '@helvetia-design/angular',
      '@helvetia-design/react',
      'DsIcon',
      '<ds-icon>',
      'no event changes',
      'no child',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
