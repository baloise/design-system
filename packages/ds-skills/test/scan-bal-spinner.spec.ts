import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { run, scanBalSpinner } from '../skills/ds-migrate-from-baloise/scripts/scan-bal-spinner.mjs'

const fixtures = join(dirname(fileURLToPath(import.meta.url)), 'fixtures')
const SKIP_DIRS = ['node_modules', 'dist', 'build', 'out', '.next', '.angular', '.git', '.claude', 'coverage']

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-spinner-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

function stage(name: string) {
  const root = createScratchDir()
  cpSync(join(fixtures, name), root, { recursive: true })
  write(
    root,
    `dist/ignored.${name === 'react' ? 'tsx' : 'html'}`,
    '<bal-spinner small></bal-spinner>\n<BalSpinner small />\n',
  )
  return root
}

describe('scanBalSpinner', () => {
  it('lists React tags and imports and skips comments, strings, and dist', () => {
    const root = stage('react')
    write(root, 'packed.tsx', 'const _value = 1// <BalSpinner small />\n')

    expect(scanBalSpinner(root)).toEqual({
      total: 8,
      files: [
        {
          file: 'App.tsx',
          findings: [
            { line: 1, snippet: "import { BalSpinner } from '@baloise/ds-react'" },
            { line: 13, snippet: '<BalSpinner small />' },
            {
              line: 14,
              snippet: '<BalSpinner color="white" inverted deactivated variation="circle" />',
            },
            { line: 15, snippet: '<BalSpinner color="blue" />' },
            { line: 16, snippet: '<BalSpinner small="false" />' },
            { line: 17, snippet: '<BalSpinner small>' },
            { line: 17, snippet: '</BalSpinner>' },
          ],
        },
        {
          file: 'Widget.jsx',
          findings: [{ line: 2, snippet: '<BalSpinner deactivated />' }],
        },
      ],
    })
  })

  it('lists Angular template tags and skips comments and non-template strings', () => {
    const root = stage('angular')

    expect(scanBalSpinner(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'app.component.html',
          findings: [
            { line: 4, snippet: '<bal-spinner small>' },
            { line: 4, snippet: '</bal-spinner>' },
            { line: 5, snippet: '<bal-spinner color="white" inverted>' },
            { line: 5, snippet: '</bal-spinner>' },
            { line: 6, snippet: '<bal-spinner color="blue" deactivated variation="logo">' },
            { line: 6, snippet: '</bal-spinner>' },
          ],
        },
        {
          file: 'app.component.ts',
          findings: [
            { line: 11, snippet: '<bal-spinner small color="blue">' },
            { line: 11, snippet: '</bal-spinner>' },
            { line: 17, snippet: '<bal-spinner deactivated variation="circle">' },
            { line: 17, snippet: '</bal-spinner>' },
          ],
        },
      ],
    })
  })

  it('lists HTML tags outside src, including a multiline opening tag, and skips markdown', () => {
    const root = stage('html')

    expect(scanBalSpinner(root)).toEqual({
      total: 10,
      files: [
        {
          file: 'index.html',
          findings: [
            { line: 6, snippet: '<bal-spinner small>' },
            { line: 6, snippet: '</bal-spinner>' },
            { line: 7, snippet: '<bal-spinner color="white">' },
            { line: 7, snippet: '</bal-spinner>' },
            { line: 10, snippet: '<bal-spinner small color="white">' },
            { line: 13, snippet: '</bal-spinner>' },
            { line: 14, snippet: '<bal-spinner color="blue">' },
            { line: 14, snippet: '</bal-spinner>' },
          ],
        },
        {
          file: 'nested/page.html',
          findings: [
            { line: 1, snippet: '<bal-spinner variation="circle">' },
            { line: 1, snippet: '</bal-spinner>' },
          ],
        },
      ],
    })
  })

  it('skips usages that live only under dependency or build directory names', () => {
    const root = createScratchDir()
    write(root, 'page.html', '<bal-spinner small></bal-spinner>\n')
    for (const dir of SKIP_DIRS) {
      write(root, `${dir}/page.html`, '<bal-spinner small></bal-spinner>\n')
      write(root, `src/${dir}/nested.html`, '<BalSpinner small />\n')
    }

    expect(scanBalSpinner(root)).toEqual({
      total: 2,
      files: [
        {
          file: 'page.html',
          findings: [
            { line: 1, snippet: '<bal-spinner small>' },
            { line: 1, snippet: '</bal-spinner>' },
          ],
        },
      ],
    })
  })

  it('prints grouped findings as JSON', () => {
    const root = createScratchDir()
    write(root, 'index.html', '<bal-spinner color="white"></bal-spinner>\n')
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
            { line: 1, snippet: '<bal-spinner color="white">' },
            { line: 1, snippet: '</bal-spinner>' },
          ],
        },
      ],
    })
  })
})

describe('spinner migration.md', () => {
  it('titles the component spinner and documents the prop mapping, confirm gate, and unstaged result', () => {
    const migration = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        '../skills/ds-migrate-from-baloise/components/spinner/migration.md',
      ),
      'utf8',
    )

    expect(migration.trimStart().startsWith('# spinner\n')).toBe(true)
    for (const phrase of [
      'scan-bal-spinner.mjs',
      'one yes/no',
      'size="sm"',
      'small="false"',
      'color="blue"',
      'color="white"',
      'inverted="true"',
      '@helvetia/ds-react',
      'DsSpinner',
      '<ds-spinner>',
      'no event changes',
      'labelPosition',
      'per-file summary',
      'git commit',
    ]) {
      expect(migration).toContain(phrase)
    }
  })
})
