import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalApp } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-app.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-app-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalApp', () => {
  it('lists React tags, imports, and the config hook, and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { useBaloiseDesignSystem, BalApp, BalButton } from '@baloise/ds-react'",
        "const _note = 'bal-app'",
        "const _example = '<BalApp>Hi</BalApp>'",
        'const _markup = `<BalApp />`',
        'const _trailing = true // <BalApp />',
        'const _hidden = /* <bal-app></bal-app> */ null',
        'type BalApplication = string',
        'export function App() {',
        "  useBaloiseDesignSystem({ language: 'fr', region: 'BE' })",
        '  return (',
        '    <BalApp onBalAppReady={ready}>',
        '      <BalButton />',
        '    </BalApp>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(root, 'dist/ignored.tsx', '<bal-app></bal-app>\n<BalApp />\n')

    const importLine = "import { useBaloiseDesignSystem, BalApp, BalButton } from '@baloise/ds-react'"

    expect(scanBalApp(root)).toEqual({
      total: 5,
      files: [
        {
          file: 'App.tsx',
          findings: [
            // one finding per matched symbol on the import line
            { line: 1, snippet: importLine },
            { line: 1, snippet: importLine },
            { line: 9, snippet: "useBaloiseDesignSystem({ language: 'fr', region: 'BE' })" },
            { line: 11, snippet: '<BalApp onBalAppReady={ready}>' },
            { line: 13, snippet: '</BalApp>' },
          ],
        },
      ],
    })
  })

  it('finds the legacy config call in a startup file that never names the component', () => {
    const root = createScratchDir()
    write(root, 'src/app.component.html', '<bal-app></bal-app>\n')
    write(
      root,
      'src/main.ts',
      [
        "import { initializeBaloiseDesignSystem } from '@baloise/ds-core'",
        "initializeBaloiseDesignSystem({ language: 'fr', region: 'BE' })",
        '',
      ].join('\n'),
    )

    // main.ts holds the language and region that must be carried onto ds-root, but it
    // never mentions bal-app. Without the initializer in the regex it would be invisible.
    expect(scanBalApp(root)).toEqual({
      total: 4,
      files: [
        {
          file: 'src/app.component.html',
          findings: [
            { line: 1, snippet: '<bal-app>' },
            { line: 1, snippet: '</bal-app>' },
          ],
        },
        {
          file: 'src/main.ts',
          findings: [
            { line: 1, snippet: "import { initializeBaloiseDesignSystem } from '@baloise/ds-core'" },
            { line: 2, snippet: "initializeBaloiseDesignSystem({ language: 'fr', region: 'BE' })" },
          ],
        },
      ],
    })
  })

  it('does not match a longer name that merely starts with BalApp, or the CSS height variable', () => {
    const root = createScratchDir()
    write(
      root,
      'decoys.ts',
      [
        'type BalApplication = string',
        'const BalAppliance = 1',
        "const height = 'var(--bal-app-height)'",
        "const other = 'initializeDesignSystem'",
        '',
      ].join('\n'),
    )

    expect(scanBalApp(root)).toEqual({ total: 0, files: [] })
  })

  it('lists Angular template tags and the ready event, and skips comments and non-template strings', () => {
    const root = createScratchDir()
    write(
      root,
      'app.component.html',
      [
        '<!-- <bal-app></bal-app> -->',
        '<div title="bal-app">text</div>',
        '<bal-app class="has-sticky-footer">',
        '  <bal-navbar></bal-navbar>',
        '</bal-app>',
        '<script>',
        "  const decoy = '<bal-app></bal-app>'",
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'inline.component.ts',
      [
        "import { Component } from '@angular/core'",
        "const _decoy = 'bal-app'",
        '// <bal-app></bal-app>',
        '@Component({',
        '  template: `',
        '    <!-- <bal-app></bal-app> -->',
        '    <bal-app (balAppReady)="onReady()">Content</bal-app>',
        '  `,',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    expect(scanBalApp(root)).toEqual({
      total: 5,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 3, snippet: '<bal-app class="has-sticky-footer">' },
            { line: 5, snippet: '</bal-app>' },
          ],
        },
        {
          file: 'inline.component.ts',
          findings: [
            // the tag match reads the tag; the balAppReady match reads the whole line
            { line: 7, snippet: '<bal-app (balAppReady)="onReady()">' },
            { line: 7, snippet: '<bal-app (balAppReady)="onReady()">Content</bal-app>' },
            { line: 7, snippet: '</bal-app>' },
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
        '    <!-- <bal-app></bal-app> -->',
        '    <p>bal-app</p>',
        '    <!-- prettier-ignore -->',
        '    <bal-app',
        '      class="has-sticky-footer"',
        '      animated="false"',
        '    ></bal-app>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'notes.md', '<bal-app></bal-app>\n')

    expect(scanBalApp(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 7, snippet: '<bal-app class="has-sticky-footer" animated="false">' },
            { line: 10, snippet: '</bal-app>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-app></bal-app>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-app></bal-app>\n')
      write(root, `src/${dir}/nested.html`, '<BalApp />\n')
    }

    expect(scanBalApp(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-app>' },
            { line: 1, snippet: '</bal-app>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-app></bal-app>\n'
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
            { line: 1, snippet: '<bal-app>' },
            { line: 1, snippet: '</bal-app>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('app migration.md', () => {
  it('titles the component app → root and documents the config, tag, import, and event mapping', () => {
    const migration = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), '../skills/ds-migrate-from-baloise/components/app/migration.md'),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# app → root\n')).toBe(true)
    for (const phrase of [
      'scan-bal-app.mjs',
      'one yes/no',
      '<ds-root>',
      'initializeBaloiseDesignSystem',
      'useBaloiseDesignSystem',
      'initializeDesignSystem',
      'allowed-languages',
      'fallback-language',
      'brand',
      'region',
      'language',
      'icons',
      'dsAppReady',
      'balAppReady',
      'setFocus',
      'getRootElement',
      '--ds-root-height',
      'ds-focusable',
      'RootCustomEvent',
      'DsRootProvider',
      '@helvetia-design/react',
      '@helvetia-design/angular',
      'BalLayoutBundle',
      'no child',
      'same name and a `.ts` extension',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
