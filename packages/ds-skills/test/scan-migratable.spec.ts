import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { componentNameToSlug, run, scanMigratable } from '../skills/ds-migrate-from-baloise/scripts/scan-migratable.mjs'

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-detect-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

describe('scanMigratable', () => {
  it('suggests used components with migrations and separates unsupported components', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalButton, BalSpinner } from '@baloise/ds-react'",
        'export const App = () => <><BalSpinner /><BalButton /></>',
      ].join('\n'),
    )

    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'spinner', total: 2 }],
      notYet: [{ name: 'button', total: 2 }],
    })
  })

  it('ignores Bal*Bundle arrays, which are groups of components and not components', () => {
    const root = createScratchDir()
    write(
      root,
      'shell.component.ts',
      [
        "import { BalLayoutBundle, BalTypographyBundle } from '@baloise/ds-angular'",
        '@Component({ imports: [BalLayoutBundle, BalTypographyBundle] })',
        'export class ShellComponent {}',
        '',
      ].join('\n'),
    )
    write(root, 'index.html', '<bal-app></bal-app>\n')

    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'app', total: 2 }],
      notYet: [],
    })
  })

  it('suggests app when the project uses bal-app', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      ["import { BalApp } from '@baloise/ds-react'", 'export const App = () => <BalApp />'].join('\n'),
    )
    write(root, 'index.html', '<bal-app></bal-app>\n')

    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'app', total: 4 }],
      notYet: [],
    })
  })

  it('suggests accordion when the project uses bal-accordion and folds its child tags in', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      ["import { BalAccordion } from '@baloise/ds-react'", 'export const App = () => <BalAccordion active />'].join(
        '\n',
      ),
    )
    write(
      root,
      'index.html',
      [
        '<bal-accordion active>',
        '  <bal-accordion-summary trigger></bal-accordion-summary>',
        '  <bal-accordion-details>Content</bal-accordion-details>',
        '</bal-accordion>',
        '',
      ].join('\n'),
    )

    // The child tags have no migration of their own; the accordion migration covers
    // them, so they count towards accordion rather than showing up as notYet.
    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'accordion', total: 8 }],
      notYet: [],
    })
  })

  it('suggests card when the project uses bal-card and folds its child tags in', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      ["import { BalCard } from '@baloise/ds-react'", 'export const App = () => <BalCard flat />'].join('\n'),
    )
    write(
      root,
      'index.html',
      [
        '<bal-card flat>',
        '  <bal-card-title>Title</bal-card-title>',
        '  <bal-card-content>Body</bal-card-content>',
        '</bal-card>',
        '',
      ].join('\n'),
    )

    // The child tags have no migration of their own; the card migration covers
    // them, so they count towards card rather than showing up as notYet.
    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'card', total: 8 }],
      notYet: [],
    })
  })

  it('suggests carousel when the project uses bal-carousel and folds its child tag in', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalCarousel } from '@baloise/ds-react'",
        'export const App = () => <BalCarousel controls="dots" />',
      ].join('\n'),
    )
    write(
      root,
      'index.html',
      [
        '<bal-carousel controls="dots">',
        '  <bal-carousel-item src="a.jpg"></bal-carousel-item>',
        '</bal-carousel>',
        '',
      ].join('\n'),
    )

    // The child tag has no migration of its own; the carousel migration covers
    // it, so it counts towards carousel rather than showing up as notYet.
    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'carousel', total: 6 }],
      notYet: [],
    })
  })

  it('suggests toast when the project uses bal-toast', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      ["import { BalToast } from '@baloise/ds-react'", 'export const App = () => <BalToast message="Hi" />'].join('\n'),
    )
    write(root, 'index.html', '<bal-toast message="Hi"></bal-toast>\n')

    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'toast', total: 4 }],
      notYet: [],
    })
  })

  it('suggests text when the project uses bal-text', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      ["import { BalText } from '@baloise/ds-react'", 'export const App = () => <BalText>Hi</BalText>'].join('\n'),
    )
    write(root, 'index.html', '<bal-text>Hi</bal-text>\n')

    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'text', total: 5 }],
      notYet: [],
    })
  })

  it('suggests tooltip when the project uses bal-tooltip', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      [
        "import { BalTooltip } from '@baloise/ds-react'",
        'export const App = () => <BalTooltip reference="save">Hint</BalTooltip>',
      ].join('\n'),
    )
    write(root, 'index.html', '<bal-tooltip reference="save">Hint</bal-tooltip>\n')

    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'tooltip', total: 5 }],
      notYet: [],
    })
  })

  it('suggests badge when the project uses bal-badge', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      ["import { BalBadge } from '@baloise/ds-react'", 'export const App = () => <BalBadge>2</BalBadge>'].join('\n'),
    )
    write(root, 'index.html', '<bal-badge color="grey">2</bal-badge>\n')

    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'badge', total: 5 }],
      notYet: [],
    })
  })

  it('suggests icon when the project uses bal-icon', () => {
    const root = createScratchDir()
    write(
      root,
      'App.tsx',
      ["import { BalIcon } from '@baloise/ds-react'", 'export const App = () => <BalIcon name="plus" />'].join('\n'),
    )
    write(root, 'index.html', '<bal-icon name="check"></bal-icon>\n')

    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'icon', total: 4 }],
      notYet: [],
    })
  })

  it('returns no suggestions when only unsupported components are used', () => {
    const root = createScratchDir()
    write(root, 'index.html', '<bal-button></bal-button>\n')

    expect(scanMigratable(root)).toEqual({
      suggested: [],
      notYet: [{ name: 'button', total: 2 }],
    })
  })

  it('skips comments, ordinary strings, and build output', () => {
    const root = createScratchDir()
    write(
      root,
      'app.component.ts',
      [
        '// <BalButton />',
        "const example = '<BalButton />'",
        '@Component({ template: `<bal-spinner></bal-spinner>` })',
      ].join('\n'),
    )
    write(root, 'dist/index.html', '<bal-button></bal-button>\n')

    expect(scanMigratable(root)).toEqual({
      suggested: [{ name: 'spinner', total: 2 }],
      notYet: [],
    })
  })

  it('prints the detection result as JSON', () => {
    const root = createScratchDir()
    write(root, 'index.html', '<bal-spinner></bal-spinner>\n')
    let text = ''

    expect(
      run(root, {
        write(chunk: string) {
          text += chunk
        },
      }),
    ).toBe(0)
    expect(JSON.parse(text)).toEqual({
      suggested: [{ name: 'spinner', total: 2 }],
      notYet: [],
    })
  })
})

describe('componentNameToSlug', () => {
  it('converts PascalCase component names to kebab-case slugs', () => {
    expect(componentNameToSlug('DatePicker')).toBe('date-picker')
    expect(componentNameToSlug('XMLViewer')).toBe('xml-viewer')
  })
})
