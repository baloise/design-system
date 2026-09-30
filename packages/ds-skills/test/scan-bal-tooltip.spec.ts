import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalTooltip } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-tooltip.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-tooltip-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalTooltip', () => {
  it('lists React tags, imports, and trigger placement and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalButton, BalTooltip } from '@baloise/ds-react'",
        "const _note = 'bal-tooltip'",
        'const _example = \'<BalTooltip placement="top">Hi</BalTooltip>\'',
        'const _markup = `<BalTooltip open>Hi</BalTooltip>`',
        'const _trailing = true // <BalTooltip placement="right" />',
        'const _hidden = /* <bal-tooltip>Hi</bal-tooltip> */ null',
        'type BalTooltipPlacement = string',
        'export function App() {',
        '  return (',
        '    <>',
        '      <BalTooltip reference="save" placement="top" contentWidth={240} onBalWillAnimate={onWill}>',
        '        Saves your progress',
        '      </BalTooltip>',
        '      <BalTooltip demo offset={16} placement="top-start" />',
        '      <BalTooltip label="Heading" placement="bottom" />',
        '      <button id="save" bal-tooltip-placement="right">Save</button>',
        '    </>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(root, 'Widget.jsx', 'export const Widget = () => <BalTooltip reference="info">Hint</BalTooltip>\n')
    write(root, 'dist/ignored.tsx', '<bal-tooltip>Hi</bal-tooltip>\n<BalTooltip>Hi</BalTooltip>\n')
    write(root, 'packed.tsx', 'const _value = 1// <BalTooltip placement="left" />\n')

    expect(scanBalTooltip(root)).toEqual({
      total: 8,
      files: [
        {
          file: 'App.tsx',
          findings: [
            { line: 1, snippet: "import { BalButton, BalTooltip } from '@baloise/ds-react'" },
            {
              line: 11,
              snippet: '<BalTooltip reference="save" placement="top" contentWidth={240} onBalWillAnimate={onWill}>',
            },
            { line: 13, snippet: '</BalTooltip>' },
            { line: 14, snippet: '<BalTooltip demo offset={16} placement="top-start" />' },
            { line: 15, snippet: '<BalTooltip label="Heading" placement="bottom" />' },
            { line: 16, snippet: '<button id="save" bal-tooltip-placement="right">Save</button>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [
            { line: 1, snippet: '<BalTooltip reference="info">' },
            { line: 1, snippet: '</BalTooltip>' },
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
        '<!-- <bal-tooltip>Hi</bal-tooltip> -->',
        '<div title="bal-tooltip">text</div>',
        '<p>Mention bal-tooltip in text only.</p>',
        '<bal-tooltip reference="save" placement="top" (balWillAnimate)="onWill($event)">Hi</bal-tooltip>',
        '<bal-tooltip demo placement="right">Hi</bal-tooltip>',
        '<button id="save" bal-tooltip-placement="bottom">Save</button>',
        '<script>',
        "  const decoy = '<bal-tooltip>Hi</bal-tooltip>'",
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'app.component.ts',
      [
        "import { Component } from '@angular/core'",
        "import { BalButton, BalTooltip } from '@baloise/ds-angular'",
        "const _decoy = 'bal-tooltip'",
        'const _markup = \'<bal-tooltip placement="top">Hi</bal-tooltip>\'',
        '// <bal-tooltip placement="left">Hi</bal-tooltip>',
        '@Component({',
        "  selector: 'app-root',",
        '  template: `',
        '    <!-- <bal-tooltip>Hi</bal-tooltip> -->',
        '    <bal-tooltip reference="inline" placement="bottom" (balDidAnimate)="onDid($event)">Hi</bal-tooltip>',
        '  `,',
        '})',
        'export class AppComponent {}',
        '@Component({',
        '  template: \'<bal-tooltip content-width="200" placement="left">Hi</bal-tooltip>\',',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    expect(scanBalTooltip(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'app.component.html',
          findings: [
            {
              line: 4,
              snippet: '<bal-tooltip reference="save" placement="top" (balWillAnimate)="onWill($event)">',
            },
            { line: 4, snippet: '</bal-tooltip>' },
            { line: 5, snippet: '<bal-tooltip demo placement="right">' },
            { line: 5, snippet: '</bal-tooltip>' },
            { line: 6, snippet: '<button id="save" bal-tooltip-placement="bottom">Save</button>' },
          ],
        },
        {
          file: 'app.component.ts',
          findings: [
            { line: 2, snippet: "import { BalButton, BalTooltip } from '@baloise/ds-angular'" },
            {
              line: 10,
              snippet: '<bal-tooltip reference="inline" placement="bottom" (balDidAnimate)="onDid($event)">',
            },
            { line: 10, snippet: '</bal-tooltip>' },
            { line: 15, snippet: '<bal-tooltip content-width="200" placement="left">' },
            { line: 15, snippet: '</bal-tooltip>' },
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
        '    <!-- <bal-tooltip placement="top">Hi</bal-tooltip> -->',
        '    <p>bal-tooltip</p>',
        '    <bal-tooltip reference="save" placement="top">Hi</bal-tooltip>',
        '    <bal-tooltip demo placement="right">Hi</bal-tooltip>',
        '    <span data-note="<bal-tooltip></bal-tooltip>">x</span>',
        '    <!-- prettier-ignore -->',
        '    <bal-tooltip',
        '      reference="more"',
        '      content-width="240"',
        '      placement="bottom-end"',
        '    >Hi</bal-tooltip>',
        '    <div>// <bal-tooltip placement="left">Hi</bal-tooltip></div>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'nested/page.html', '<bal-tooltip reference="nested">Hi</bal-tooltip>\n')
    write(root, 'notes.md', '<bal-tooltip>Hi</bal-tooltip>\n')

    expect(scanBalTooltip(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-tooltip reference="save" placement="top">' },
            { line: 6, snippet: '</bal-tooltip>' },
            { line: 7, snippet: '<bal-tooltip demo placement="right">' },
            { line: 7, snippet: '</bal-tooltip>' },
            { line: 10, snippet: '<bal-tooltip reference="more" content-width="240" placement="bottom-end">' },
            { line: 14, snippet: '</bal-tooltip>' },
            { line: 15, snippet: '<bal-tooltip placement="left">' },
            { line: 15, snippet: '</bal-tooltip>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-tooltip reference="nested">' },
            { line: 1, snippet: '</bal-tooltip>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-tooltip reference="save">Hi</bal-tooltip>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-tooltip reference="save">Hi</bal-tooltip>\n')
      write(root, `src/${dir}/nested.html`, '<BalTooltip reference="save" />\n')
    }

    expect(scanBalTooltip(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-tooltip reference="save">' },
            { line: 1, snippet: '</bal-tooltip>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-tooltip placement="top">Hi</bal-tooltip>\n'
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
            { line: 1, snippet: '<bal-tooltip placement="top">' },
            { line: 1, snippet: '</bal-tooltip>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('tooltip migration.md', () => {
  it('titles the component tooltip and documents the prop, tag, import, and event mapping', () => {
    const migration = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        '../skills/ds-migrate-from-baloise/components/tooltip/migration.md',
      ),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# tooltip\n')).toBe(true)
    for (const phrase of [
      'scan-bal-tooltip.mjs',
      'one yes/no',
      'placement="top"',
      'top-start',
      'offset',
      'contentWidth',
      'demo',
      'open',
      'label',
      'bal-tooltip-placement',
      'onBalWillAnimate',
      'onDsWillAnimate',
      'dsWillAnimate',
      'dsDidAnimate',
      '@helvetia-design/angular',
      '@helvetia-design/react',
      'DsTooltip',
      '<ds-tooltip>',
      'no child',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
