import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalCheckbox } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-checkbox.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-checkbox-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalCheckbox', () => {
  it('lists React tags, the group tag, and the import symbols, and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalCheckbox, BalCheckboxGroup } from '@baloise/ds-react'",
        "const _note = 'bal-checkbox'",
        'const _example = \'<BalCheckbox value="1"></BalCheckbox>\'',
        'const _markup = `<BalCheckboxGroup />`',
        'const _trailing = true // <BalCheckbox />',
        'const _hidden = /* <bal-checkbox></bal-checkbox> */ null',
        'type BalCheckboxOption = string',
        'export function App() {',
        '  return (',
        '    <>',
        '      <BalCheckboxGroup control>',
        '        <BalCheckbox value="1">',
        '          Label',
        '        </BalCheckbox>',
        '      </BalCheckboxGroup>',
        '      <BalCheckbox interface="switch">Switch</BalCheckbox>',
        '    </>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(root, 'Widget.jsx', 'export const Widget = () => <BalCheckbox value="1">Hi</BalCheckbox>\n')
    write(root, 'dist/ignored.tsx', '<bal-checkbox></bal-checkbox>\n<BalCheckbox />\n')
    write(root, 'packed.tsx', 'const _value = 1// <BalCheckbox />\n')

    const importLine = "import { BalCheckbox, BalCheckboxGroup } from '@baloise/ds-react'"

    expect(scanBalCheckbox(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'App.tsx',
          findings: [
            { line: 1, snippet: importLine },
            { line: 1, snippet: importLine },
            { line: 11, snippet: '<BalCheckboxGroup control>' },
            { line: 12, snippet: '<BalCheckbox value="1">' },
            { line: 14, snippet: '</BalCheckbox>' },
            { line: 15, snippet: '</BalCheckboxGroup>' },
            { line: 16, snippet: '<BalCheckbox interface="switch">' },
            { line: 16, snippet: '</BalCheckbox>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [
            { line: 1, snippet: '<BalCheckbox value="1">' },
            { line: 1, snippet: '</BalCheckbox>' },
          ],
        },
      ],
    })
  })

  it('does not match a longer PascalCase name that merely starts with BalCheckbox', () => {
    const root = createScratchDir()
    write(root, 'types.ts', ['type BalCheckboxOption = string', 'const BalCheckboxish = 1', ''].join('\n'))

    expect(scanBalCheckbox(root)).toEqual({ total: 0, files: [] })
  })

  it('lists Angular template tags, the group child tag, and separate imports (no bundle), skipping comments and non-template strings', () => {
    const root = createScratchDir()
    write(
      root,
      'app.component.html',
      [
        '<!-- <bal-checkbox></bal-checkbox> -->',
        '<div title="bal-checkbox">text</div>',
        '<p>Mention bal-checkbox in text only.</p>',
        '<bal-checkbox-group #cg control value="1">',
        '  <bal-checkbox value="1" interface="switch"></bal-checkbox>',
        '</bal-checkbox-group>',
        '<script>',
        "  const decoy = '<bal-checkbox></bal-checkbox>'",
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'inline.component.ts',
      [
        "import { Component } from '@angular/core'",
        "import { BalCheckbox, BalCheckboxGroup } from '@baloise/ds-angular'",
        "const _decoy = 'bal-checkbox'",
        '// <bal-checkbox></bal-checkbox>',
        '@Component({',
        '  imports: [BalCheckbox, BalCheckboxGroup],',
        '  template: `',
        '    <!-- <bal-checkbox></bal-checkbox> -->',
        '    <bal-checkbox-group control value="1">',
        '      <bal-checkbox value="1"></bal-checkbox>',
        '    </bal-checkbox-group>',
        '  `,',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    const importLine = "import { BalCheckbox, BalCheckboxGroup } from '@baloise/ds-angular'"

    expect(scanBalCheckbox(root)).toEqual({
      total: 12,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 4, snippet: '<bal-checkbox-group #cg control value="1">' },
            { line: 5, snippet: '<bal-checkbox value="1" interface="switch">' },
            { line: 5, snippet: '</bal-checkbox>' },
            { line: 6, snippet: '</bal-checkbox-group>' },
          ],
        },
        {
          file: 'inline.component.ts',
          findings: [
            { line: 2, snippet: importLine },
            { line: 2, snippet: importLine },
            { line: 6, snippet: 'imports: [BalCheckbox, BalCheckboxGroup],' },
            { line: 6, snippet: 'imports: [BalCheckbox, BalCheckboxGroup],' },
            { line: 9, snippet: '<bal-checkbox-group control value="1">' },
            { line: 10, snippet: '<bal-checkbox value="1">' },
            { line: 10, snippet: '</bal-checkbox>' },
            { line: 11, snippet: '</bal-checkbox-group>' },
          ],
        },
      ],
    })
  })

  it('lists HTML tags outside src, including a multiline group tag, and skips markdown', () => {
    const root = createScratchDir()
    write(
      root,
      'index.html',
      [
        '<!doctype html>',
        '<html>',
        '  <body>',
        '    <!-- <bal-checkbox></bal-checkbox> -->',
        '    <p>bal-checkbox</p>',
        '    <bal-checkbox value="1"></bal-checkbox>',
        '    <span data-note="<bal-checkbox></bal-checkbox>">x</span>',
        '    <!-- prettier-ignore -->',
        '    <bal-checkbox-group',
        '      control',
        '      value="1"',
        '    ></bal-checkbox-group>',
        '    <div>// <bal-checkbox value="2"></bal-checkbox></div>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'nested/page.html', '<bal-checkbox-group control></bal-checkbox-group>\n')
    write(root, 'notes.md', '<bal-checkbox></bal-checkbox>\n')

    expect(scanBalCheckbox(root)).toEqual({
      total: 8,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-checkbox value="1">' },
            { line: 6, snippet: '</bal-checkbox>' },
            { line: 9, snippet: '<bal-checkbox-group control value="1">' },
            { line: 12, snippet: '</bal-checkbox-group>' },
            { line: 13, snippet: '<bal-checkbox value="2">' },
            { line: 13, snippet: '</bal-checkbox>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-checkbox-group control>' },
            { line: 1, snippet: '</bal-checkbox-group>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-checkbox value="1"></bal-checkbox>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-checkbox value="1"></bal-checkbox>\n')
      write(root, `src/${dir}/nested.html`, '<BalCheckbox value="1" />\n')
    }

    expect(scanBalCheckbox(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-checkbox value="1">' },
            { line: 1, snippet: '</bal-checkbox>' },
          ],
        },
      ],
    })
  })

  it('lists a bare newBalCheckboxOption() call as a usage signal, skipping it inside strings and comments', () => {
    const root = createScratchDir()
    write(
      root,
      'options.ts',
      [
        "import { newBalCheckboxOption } from '@baloise/ds-core'",
        'const options = [newBalCheckboxOption({ value: "1", label: "Label 1" })]',
        "const decoy = 'newBalCheckboxOption'",
        '// newBalCheckboxOption',
        '',
      ].join('\n'),
    )

    expect(scanBalCheckbox(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'options.ts',
          findings: [
            { line: 1, snippet: "import { newBalCheckboxOption } from '@baloise/ds-core'" },
            { line: 2, snippet: 'const options = [newBalCheckboxOption({ value: "1", label: "Label 1" })]' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-checkbox value="1"></bal-checkbox>\n'
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
            { line: 1, snippet: '<bal-checkbox value="1">' },
            { line: 1, snippet: '</bal-checkbox>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('checkbox migration.md', () => {
  it('titles the component checkbox and documents the bundled group, shape, prop, tag, import, event, and method mapping', () => {
    const migration = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        '../skills/ds-migrate-from-baloise/components/checkbox/migration.md',
      ),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# checkbox\n')).toBe(true)
    for (const phrase of [
      'scan-bal-checkbox.mjs',
      'one yes/no',
      'bal-checkbox-group',
      'querySelectorAll',
      'ds-toggle',
      'control',
      'visual benefit persists, but value binding breaks',
      'hideTrigger',
      'slight design deviation',
      'tileColor',
      'newBalCheckboxOption',
      'bal-field',
      'labelHidden',
      'nonSubmit',
      'verticalOnMobile',
      'expanded',
      'getOptionByValue',
      'setFocus()',
      'setBlur()',
      'getInputElement()',
      'getOption()',
      'DsCheckbox',
      'DsCheckboxGroup',
      'DsToggle',
      '@helvetia-design/angular',
      '@helvetia-design/react',
      'dsChange',
      'dsFocus',
      'dsBlur',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
