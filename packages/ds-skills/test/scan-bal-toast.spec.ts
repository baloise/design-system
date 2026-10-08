import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalToast } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-toast.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-toast-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalToast', () => {
  it('lists React tags, imports, and the toast controller, and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalButton, BalToast, BalToaster } from '@baloise/ds-react'",
        "import { balToastController, BalToastOptions } from '@baloise/ds-core'",
        "const _note = 'bal-toast'",
        'const _example = \'<BalToast color="info">Hi</BalToast>\'',
        'const _markup = `<BalToast message="Hi"></BalToast>`',
        'const _trailing = true // <BalToast color="primary" />',
        'const _hidden = /* <bal-toast>Hi</bal-toast> */ null',
        'void BalToaster',
        'export function App() {',
        '  return (',
        '    <>',
        '      <BalToast message="Saved" closable />',
        '      <BalToast color="danger" duration={3000} />',
        '      <BalToast message="Queued">',
        '      </BalToast>',
        '    </>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(
      root,
      'Widget.jsx',
      'const _label = \'bal-toast\'\nexport const Widget = () => <BalToast message="Hi">Hi</BalToast>\n',
    )
    write(root, 'dist/ignored.tsx', '<bal-toast>Hi</bal-toast>\n<BalToast>Hi</BalToast>\n')
    write(root, 'packed.tsx', 'const _value = 1// <BalToast color="info" />\n')

    expect(scanBalToast(root)).toEqual({
      total: 9,
      files: [
        {
          file: 'App.tsx',
          findings: [
            { line: 1, snippet: "import { BalButton, BalToast, BalToaster } from '@baloise/ds-react'" },
            { line: 2, snippet: "import { balToastController, BalToastOptions } from '@baloise/ds-core'" },
            { line: 2, snippet: "import { balToastController, BalToastOptions } from '@baloise/ds-core'" },
            { line: 12, snippet: '<BalToast message="Saved" closable />' },
            { line: 13, snippet: '<BalToast color="danger" duration={3000} />' },
            { line: 14, snippet: '<BalToast message="Queued">' },
            { line: 15, snippet: '</BalToast>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [
            { line: 2, snippet: '<BalToast message="Hi">' },
            { line: 2, snippet: '</BalToast>' },
          ],
        },
      ],
    })
  })

  it('lists Angular template tags and the toast service, and skips comments and non-template strings', () => {
    const root = createScratchDir()
    write(
      root,
      'app.component.html',
      [
        '<!-- <bal-toast>Hi</bal-toast> -->',
        '<div title="bal-toast">text</div>',
        '<p>Mention bal-toast in text only.</p>',
        '<bal-toast message="Hi" closable>Hi</bal-toast>',
        '<bal-toast color="danger" duration="3000">Hi</bal-toast>',
        '<bal-toaster>nope</bal-toaster>',
        '<script>',
        "  const decoy = '<bal-toast>Hi</bal-toast>'",
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'app.component.ts',
      [
        "import { Component } from '@angular/core'",
        "import { BalToast, BalToaster } from '@baloise/ds-angular'",
        "import { BalToastService } from '@baloise/ds-angular'",
        "const _decoy = 'bal-toast'",
        'const _markup = \'<bal-toast message="Hi">Hi</bal-toast>\'',
        '// <bal-toast color="danger">Hi</bal-toast>',
        'void BalToaster',
        '@Component({',
        "  selector: 'app-root',",
        '  template: `',
        '    <!-- <bal-toast>Hi</bal-toast> -->',
        '    <bal-toast message="Saved" color="info">Hi</bal-toast>',
        '  `,',
        '})',
        'export class AppComponent {}',
        '@Component({',
        '  template: \'<bal-toast message="Queued" closable="false">Hi</bal-toast>\',',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    expect(scanBalToast(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 4, snippet: '<bal-toast message="Hi" closable>' },
            { line: 4, snippet: '</bal-toast>' },
            { line: 5, snippet: '<bal-toast color="danger" duration="3000">' },
            { line: 5, snippet: '</bal-toast>' },
          ],
        },
        {
          file: 'app.component.ts',
          findings: [
            { line: 2, snippet: "import { BalToast, BalToaster } from '@baloise/ds-angular'" },
            { line: 3, snippet: "import { BalToastService } from '@baloise/ds-angular'" },
            { line: 12, snippet: '<bal-toast message="Saved" color="info">' },
            { line: 12, snippet: '</bal-toast>' },
            { line: 17, snippet: '<bal-toast message="Queued" closable="false">' },
            { line: 17, snippet: '</bal-toast>' },
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
        '    <!-- <bal-toast color="danger">Hi</bal-toast> -->',
        '    <p>bal-toast</p>',
        '    <bal-toast message="Saved" closable>Hi</bal-toast>',
        '    <bal-toast color="info">Hi</bal-toast>',
        '    <bal-toaster>nope</bal-toaster>',
        '    <span data-note="<bal-toast></bal-toast>">x</span>',
        '    <!-- prettier-ignore -->',
        '    <bal-toast',
        '      message="Queued"',
        '      color="success"',
        '    >Hi</bal-toast>',
        '    <div>// <bal-toast color="warning">Hi</bal-toast></div>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'nested/page.html', '<bal-toast message="Hi">Hi</bal-toast>\n')
    write(root, 'notes.md', '<bal-toast>Hi</bal-toast>\n')

    expect(scanBalToast(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-toast message="Saved" closable>' },
            { line: 6, snippet: '</bal-toast>' },
            { line: 7, snippet: '<bal-toast color="info">' },
            { line: 7, snippet: '</bal-toast>' },
            { line: 11, snippet: '<bal-toast message="Queued" color="success">' },
            { line: 14, snippet: '</bal-toast>' },
            { line: 15, snippet: '<bal-toast color="warning">' },
            { line: 15, snippet: '</bal-toast>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-toast message="Hi">' },
            { line: 1, snippet: '</bal-toast>' },
          ],
        },
      ],
    })
  })

  it('lists a controller that is not next to a tag', () => {
    const root = createScratchDir()
    write(
      root,
      'toast.ts',
      [
        "import { BalToastController, balToastController } from '@baloise/ds-core'",
        'balToastController.create({ message: "Saved" })',
        'const id: BalToastController = balToastController',
        '',
      ].join('\n'),
    )

    expect(scanBalToast(root)).toEqual({
      total: 5,
      files: [
        {
          file: 'toast.ts',
          findings: [
            { line: 1, snippet: "import { BalToastController, balToastController } from '@baloise/ds-core'" },
            { line: 1, snippet: "import { BalToastController, balToastController } from '@baloise/ds-core'" },
            { line: 2, snippet: 'balToastController.create({ message: "Saved" })' },
            { line: 3, snippet: 'const id: BalToastController = balToastController' },
            { line: 3, snippet: 'const id: BalToastController = balToastController' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-toast>Hi</bal-toast>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-toast>Hi</bal-toast>\n')
      write(root, `src/${dir}/nested.html`, '<BalToast>Hi</BalToast>\n')
    }

    expect(scanBalToast(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-toast>' },
            { line: 1, snippet: '</bal-toast>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-toast message="Saved">Hi</bal-toast>\n'
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
            { line: 1, snippet: '<bal-toast message="Saved">' },
            { line: 1, snippet: '</bal-toast>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('toast migration.md', () => {
  it('titles the component toast and documents the prop, import, and event mapping', () => {
    const migration = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), '../skills/ds-migrate-from-baloise/components/toast/migration.md'),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# toast\n')).toBe(true)
    for (const phrase of [
      'scan-bal-toast.mjs',
      'one yes/no',
      'closable',
      'duration',
      'heading',
      'message',
      'color="primary"',
      'color="info"',
      'balClose',
      'dsCloseClick',
      'closeIn',
      'balToastController',
      'dsToastController',
      'BalToastService',
      '@helvetia-design/angular',
      '@helvetia-design/react',
      '@helvetia-design/core',
      'DsToast',
      '<ds-toast>',
      'no child',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
