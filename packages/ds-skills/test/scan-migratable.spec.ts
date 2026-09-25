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
