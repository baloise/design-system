import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalCarousel } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-carousel.mjs'

const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-carousel-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanBalCarousel', () => {
  it('lists React tags and the item/bundle import symbols and skips comments, strings, and dist', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalCarousel, BalCarouselItem } from '@baloise/ds-react'",
        "const _note = 'bal-carousel'",
        'const _example = \'<BalCarousel controls="dots"></BalCarousel>\'',
        'const _markup = `<BalCarousel controls="dots" />`',
        'const _trailing = true // <BalCarousel controls="dots" />',
        'const _hidden = /* <bal-carousel></bal-carousel> */ null',
        'type BalCarouselling = string',
        'export function App() {',
        '  return (',
        '    <>',
        '      <BalCarousel controls="dots" value={1}>',
        '        <BalCarouselItem src="a.jpg"></BalCarouselItem>',
        '      </BalCarousel>',
        '      <BalCarousel controls="large">Content</BalCarousel>',
        '    </>',
        '  )',
        '}',
        '',
      ].join('\n'),
    )
    write(root, 'Widget.jsx', 'export const Widget = () => <BalCarousel controls="dots">Hi</BalCarousel>\n')
    write(root, 'dist/ignored.tsx', '<bal-carousel></bal-carousel>\n<BalCarousel />\n')
    write(root, 'packed.tsx', 'const _value = 1// <BalCarousel />\n')

    const importLine = "import { BalCarousel, BalCarouselItem } from '@baloise/ds-react'"

    expect(scanBalCarousel(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'App.tsx',
          findings: [
            { line: 1, snippet: importLine },
            { line: 1, snippet: importLine },
            { line: 11, snippet: '<BalCarousel controls="dots" value={1}>' },
            { line: 12, snippet: '<BalCarouselItem src="a.jpg">' },
            { line: 12, snippet: '</BalCarouselItem>' },
            { line: 13, snippet: '</BalCarousel>' },
            { line: 14, snippet: '<BalCarousel controls="large">' },
            { line: 14, snippet: '</BalCarousel>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [
            { line: 1, snippet: '<BalCarousel controls="dots">' },
            { line: 1, snippet: '</BalCarousel>' },
          ],
        },
      ],
    })
  })

  it('does not match a longer PascalCase name that merely starts with BalCarousel', () => {
    const root = createScratchDir()
    write(root, 'types.ts', ['type BalCarouselling = string', 'const BalCarouselish = 1', ''].join('\n'))

    expect(scanBalCarousel(root)).toEqual({ total: 0, files: [] })
  })

  it('lists Angular template tags, the child tag, and the bundle, and skips comments and non-template strings', () => {
    const root = createScratchDir()
    write(
      root,
      'app.component.html',
      [
        '<!-- <bal-carousel></bal-carousel> -->',
        '<div title="bal-carousel">text</div>',
        '<p>Mention bal-carousel in text only.</p>',
        '<bal-carousel #c controls="dots" value="1">',
        '  <bal-carousel-item src="a.jpg"></bal-carousel-item>',
        '</bal-carousel>',
        '<script>',
        "  const decoy = '<bal-carousel></bal-carousel>'",
        '</script>',
        '',
      ].join('\n'),
    )
    write(
      root,
      'inline.component.ts',
      [
        "import { Component } from '@angular/core'",
        "import { BalCarouselBundle } from '@baloise/ds-angular'",
        "const _decoy = 'bal-carousel'",
        '// <bal-carousel></bal-carousel>',
        '@Component({',
        '  imports: [BalCarouselBundle],',
        '  template: `',
        '    <!-- <bal-carousel></bal-carousel> -->',
        '    <bal-carousel controls="large">Content</bal-carousel>',
        '  `,',
        '})',
        'export class InlineComponent {}',
        '',
      ].join('\n'),
    )

    expect(scanBalCarousel(root)).toEqual({
      total: 8,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 4, snippet: '<bal-carousel #c controls="dots" value="1">' },
            { line: 5, snippet: '<bal-carousel-item src="a.jpg">' },
            { line: 5, snippet: '</bal-carousel-item>' },
            { line: 6, snippet: '</bal-carousel>' },
          ],
        },
        {
          file: 'inline.component.ts',
          findings: [
            { line: 2, snippet: "import { BalCarouselBundle } from '@baloise/ds-angular'" },
            { line: 6, snippet: 'imports: [BalCarouselBundle],' },
            { line: 9, snippet: '<bal-carousel controls="large">' },
            { line: 9, snippet: '</bal-carousel>' },
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
        '    <!-- <bal-carousel></bal-carousel> -->',
        '    <p>bal-carousel</p>',
        '    <bal-carousel controls="dots"></bal-carousel>',
        '    <span data-note="<bal-carousel></bal-carousel>">x</span>',
        '    <!-- prettier-ignore -->',
        '    <bal-carousel',
        '      controls="large"',
        '      value="2"',
        '    ></bal-carousel>',
        '    <div>// <bal-carousel-item src="a.jpg"></bal-carousel-item></div>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    )
    write(root, 'nested/page.html', '<bal-carousel controls="small"></bal-carousel>\n')
    write(root, 'notes.md', '<bal-carousel></bal-carousel>\n')

    expect(scanBalCarousel(root)).toEqual({
      total: 8,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-carousel controls="dots">' },
            { line: 6, snippet: '</bal-carousel>' },
            { line: 9, snippet: '<bal-carousel controls="large" value="2">' },
            { line: 12, snippet: '</bal-carousel>' },
            { line: 13, snippet: '<bal-carousel-item src="a.jpg">' },
            { line: 13, snippet: '</bal-carousel-item>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-carousel controls="small">' },
            { line: 1, snippet: '</bal-carousel>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-carousel controls="dots"></bal-carousel>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-carousel controls="dots"></bal-carousel>\n')
      write(root, `src/${dir}/nested.html`, '<BalCarousel controls="dots" />\n')
    }

    expect(scanBalCarousel(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-carousel controls="dots">' },
            { line: 1, snippet: '</bal-carousel>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON and does not edit files', () => {
    const root = createScratchDir()
    const contents = '<bal-carousel controls="dots"></bal-carousel>\n'
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
            { line: 1, snippet: '<bal-carousel controls="dots">' },
            { line: 1, snippet: '</bal-carousel>' },
          ],
        },
      ],
    })
    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe(contents)
  })
})

describe('carousel migration.md', () => {
  it('titles the component carousel and documents the shape, prop, tag, import, event, and method mapping', () => {
    const migration = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        '../skills/ds-migrate-from-baloise/components/carousel/migration.md',
      ),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# carousel\n')).toBe(true)
    for (const phrase of [
      'scan-bal-carousel.mjs',
      'one yes/no',
      'name="item-1"',
      'name="item-2"',
      '@Required()',
      'controls="large"',
      'controls="tabs"',
      'variant="tile"',
      'aspectRatio',
      'navigation',
      '<button type={elementType}',
      'color="white"',
      'ds-brand-icon',
      'slot as plain text',
      'BalCarouselBundle',
      '@helvetia-design/angular',
      '@helvetia-design/react',
      'DsCarousel',
      'dsChange',
      'balNavigate',
      'balFocus',
      'balBlur',
      'previous()',
      'next()',
      'setFocus()',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration, phrase).toContain(phrase)
    }
  })
})
