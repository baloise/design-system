import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalAccordion } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-accordion.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-accordion-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalAccordion', () => {
  it('lists React tags and every accordion import symbol and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalAccordion, BalAccordionSummary, BalAccordionDetails } from '@baloise/ds-react'",
        "const _note = 'bal-accordion'",
        "const _example = '<BalAccordion active>Hi</BalAccordion>'",
        'const _markup = `<BalAccordion active />`',
        'const _trailing = true // <BalAccordion active />',
        'const _hidden = /* <bal-accordion></bal-accordion> */ null',
        'type BalAccordionista = string',
        'export function App() {',
        '  return (',
        '    <>',
        '      <BalAccordion active onBalChange={onChange}>',
        '        <BalAccordionSummary trigger>Label</BalAccordionSummary>',
        '        <BalAccordionDetails>Content</BalAccordionDetails>',
        '      </BalAccordion>',
        '      <BalAccordion open-label="Show more">Content</BalAccordion>',
        '    </>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(root, 'Widget.jsx', 'export const Widget = () => <BalAccordion active>Hi</BalAccordion>\n')
    write(root, 'dist/ignored.tsx', '<bal-accordion active></bal-accordion>\n<BalAccordion active />\n')
    write(root, 'packed.tsx', 'const _value = 1// <BalAccordion active />\n')

    const importLine = "import { BalAccordion, BalAccordionSummary, BalAccordionDetails } from '@baloise/ds-react'"

    expect(scanBalAccordion(root)).toEqual({
      total: 13,
      files: [
        {
          file: 'App.tsx',
          findings: [
            // one finding per accordion symbol on the import line
            { line: 1, snippet: importLine },
            { line: 1, snippet: importLine },
            { line: 1, snippet: importLine },
            { line: 11, snippet: '<BalAccordion active onBalChange={onChange}>' },
            { line: 12, snippet: '<BalAccordionSummary trigger>' },
            { line: 12, snippet: '</BalAccordionSummary>' },
            { line: 13, snippet: '<BalAccordionDetails>' },
            { line: 13, snippet: '</BalAccordionDetails>' },
            { line: 14, snippet: '</BalAccordion>' },
            { line: 15, snippet: '<BalAccordion open-label="Show more">' },
            { line: 15, snippet: '</BalAccordion>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [
            { line: 1, snippet: '<BalAccordion active>' },
            { line: 1, snippet: '</BalAccordion>' },
          ],
        },
      ],
    })
  })

  it('does not match a longer PascalCase name that merely starts with BalAccordion', () => {
    const root = createScratchDir()
    write(root, 'types.ts', ['type BalAccordionista = string', 'const BalAccordionish = 1', ''].join('\n'))

    expect(scanBalAccordion(root)).toEqual({ total: 0, files: [] })
  })

  it('lists Angular template tags, child tags, and the bundle, and skips comments and non-template strings', () => {
    const root = createScratchDir()
    write(
      root,
      'app.component.html',
      [
        '<!-- <bal-accordion active></bal-accordion> -->',
        '<div title="bal-accordion">text</div>',
        '<p>Mention bal-accordion in text only.</p>',
        '<bal-accordion #acc active (balChange)="onToggle($event)">',
        '  <bal-accordion-summary trigger>',
        '    <bal-accordion-trigger button color="info" size="small"></bal-accordion-trigger>',
        '  </bal-accordion-summary>',
        '  <bal-accordion-details>Content</bal-accordion-details>',
        '</bal-accordion>',
        '<script>',
        "  const decoy = '<bal-accordion></bal-accordion>'",
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'inline.component.ts',
      [
        "import { Component } from '@angular/core'",
        "import { BalAccordionBundle } from '@baloise/ds-angular'",
        "const _decoy = 'bal-accordion'",
        '// <bal-accordion active></bal-accordion>',
        '@Component({',
        '  imports: [BalAccordionBundle],',
        '  template: `',
        '    <!-- <bal-accordion></bal-accordion> -->',
        '    <bal-accordion open-label="Show more">Content</bal-accordion>',
        '  `,',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    expect(scanBalAccordion(root)).toEqual({
      total: 12,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 4, snippet: '<bal-accordion #acc active (balChange)="onToggle($event)">' },
            { line: 5, snippet: '<bal-accordion-summary trigger>' },
            { line: 6, snippet: '<bal-accordion-trigger button color="info" size="small">' },
            { line: 6, snippet: '</bal-accordion-trigger>' },
            { line: 7, snippet: '</bal-accordion-summary>' },
            { line: 8, snippet: '<bal-accordion-details>' },
            { line: 8, snippet: '</bal-accordion-details>' },
            { line: 9, snippet: '</bal-accordion>' },
          ],
        },
        {
          file: 'inline.component.ts',
          findings: [
            { line: 2, snippet: "import { BalAccordionBundle } from '@baloise/ds-angular'" },
            { line: 6, snippet: 'imports: [BalAccordionBundle],' },
            { line: 9, snippet: '<bal-accordion open-label="Show more">' },
            { line: 9, snippet: '</bal-accordion>' },
          ],
        },
      ],
    })
  })

  it('does not list an Angular class file that only calls a method beside a scanned template', () => {
    const root = createScratchDir()
    write(root, 'app.component.html', '<bal-accordion #acc active></bal-accordion>\n')
    write(
      root,
      'app.component.ts',
      [
        "import { Component, ElementRef, ViewChild } from '@angular/core'",
        "@Component({ selector: 'app-root', templateUrl: './app.component.html' })",
        'export class AppComponent {',
        "  @ViewChild('acc') acc!: ElementRef",
        '  openIt() {',
        '    this.acc.nativeElement.present()',
        '  }',
        '}',
        '',
      ].join('\n'),
    )

    // The class file never names the component, so the scan cannot see it. The
    // sibling-file rule in components/accordion/migration.md covers it, because the
    // template of the same basename is listed.
    expect(scanBalAccordion(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 1, snippet: '<bal-accordion #acc active>' },
            { line: 1, snippet: '</bal-accordion>' },
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
        '    <!-- <bal-accordion active></bal-accordion> -->',
        '    <p>bal-accordion</p>',
        '    <bal-accordion active></bal-accordion>',
        '    <span data-note="<bal-accordion></bal-accordion>">x</span>',
        '    <!-- prettier-ignore -->',
        '    <bal-accordion',
        '      open-label="Show more"',
        '      close-label="Show less"',
        '    ></bal-accordion>',
        '    <div>// <bal-accordion card></bal-accordion></div>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'nested/page.html', '<bal-accordion version="2"></bal-accordion>\n')
    write(root, 'notes.md', '<bal-accordion></bal-accordion>\n')

    expect(scanBalAccordion(root)).toEqual({
      total: 8,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-accordion active>' },
            { line: 6, snippet: '</bal-accordion>' },
            { line: 9, snippet: '<bal-accordion open-label="Show more" close-label="Show less">' },
            { line: 12, snippet: '</bal-accordion>' },
            { line: 13, snippet: '<bal-accordion card>' },
            { line: 13, snippet: '</bal-accordion>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-accordion version="2">' },
            { line: 1, snippet: '</bal-accordion>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-accordion active></bal-accordion>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-accordion active></bal-accordion>\n')
      write(root, `src/${dir}/nested.html`, '<BalAccordion active />\n')
    }

    expect(scanBalAccordion(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-accordion active>' },
            { line: 1, snippet: '</bal-accordion>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-accordion active></bal-accordion>\n'
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
            { line: 1, snippet: '<bal-accordion active>' },
            { line: 1, snippet: '</bal-accordion>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('accordion migration.md', () => {
  it('titles the component accordion and documents the prop, tag, import, event, and method mapping', () => {
    const migration = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        '../skills/ds-migrate-from-baloise/components/accordion/migration.md',
      ),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# accordion\n')).toBe(true)
    for (const phrase of [
      'scan-bal-accordion.mjs',
      'one yes/no',
      '<ds-accordion>',
      'slot="summary"',
      'slot="content"',
      'bal-accordion-summary',
      'bal-accordion-trigger',
      'bal-accordion-details',
      'open',
      'debounce',
      'card',
      'version',
      'button-label-open',
      'button-icon-open',
      'button-wide',
      'button-color',
      'button-size="sm"',
      'marker="none"',
      'summary-level',
      'balChange',
      'dsToggle',
      '.detail.open',
      'balWillAnimate',
      'balDidAnimate',
      'present()',
      'el.open = true',
      'BalAccordionBundle',
      '@helvetia-design/angular',
      '@helvetia-design/react',
      'DsAccordion',
      'same name and a `.ts` extension',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
