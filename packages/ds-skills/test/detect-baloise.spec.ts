import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { detectBaloise, readNpmDistTags, run } from '../skills/ds-migrate-from-baloise/scripts/detect-baloise.mjs'

const NOTHING = 'no Baloise Design System installation detected, nothing to migrate'

const scratches: string[] = []

afterEach(() => {
  for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  scratches.length = 0
})

function createScratchDir() {
  const dir = mkdtempSync(join(tmpdir(), 'ds-migrate-init-'))
  scratches.push(dir)
  return dir
}

function write(root: string, rel: string, contents: string) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

function distTags(version: string) {
  return async () => ({ latest: '19.10.2', next: version })
}

describe('detectBaloise', () => {
  it('reports nothing to migrate when no Baloise dependency or import exists', async () => {
    const root = createScratchDir()
    write(root, 'package.json', JSON.stringify({ name: 'app', dependencies: { react: '19.0.0' } }))

    const result = await detectBaloise(root, {
      readDistTags: async () => {
        throw new Error('npm view should not run when nothing is installed')
      },
    })

    expect(result).toEqual({
      status: 'nothing-to-migrate',
      message: NOTHING,
    })
  })

  it('reports nothing to migrate when a dependency exists but no CSS or JS import does', async () => {
    const root = createScratchDir()
    write(
      root,
      'package.json',
      JSON.stringify({ dependencies: { '@baloise/ds-core': '19.10.2', '@baloise/ds-styles': '19.10.2' } }),
    )

    const result = await detectBaloise(root, {
      readDistTags: async () => {
        throw new Error('npm view should not run without an import')
      },
    })

    expect(result).toEqual({ status: 'nothing-to-migrate', message: NOTHING })
  })

  it('reports nothing to migrate when an import exists but package.json does not depend on Baloise', async () => {
    const root = createScratchDir()
    write(root, 'package.json', JSON.stringify({ name: 'app' }))
    write(
      root,
      'index.html',
      '<link rel="stylesheet" href="node_modules/@baloise/ds-styles/dist/css/design-system.css" />\n',
    )

    const result = await detectBaloise(root, {
      readDistTags: async () => {
        throw new Error('npm view should not run without a dependency')
      },
    })

    expect(result).toEqual({ status: 'nothing-to-migrate', message: NOTHING })
  })

  it('ignores an import that only exists under a skipped directory', async () => {
    const root = createScratchDir()
    write(root, 'package.json', JSON.stringify({ dependencies: { '@baloise/ds-core': '19.10.2' } }))
    write(
      root,
      'dist/index.html',
      '<script type="module" src="node_modules/@baloise/ds-core/dist/design-system/design-system.esm.js"></script>\n',
    )
    write(root, 'coverage/app.js', "import '@baloise/ds-core'\n")

    const result = await detectBaloise(root, {
      readDistTags: async () => {
        throw new Error('imports under dist and coverage are not an install')
      },
    })

    expect(result).toEqual({ status: 'nothing-to-migrate', message: NOTHING })
  })

  it('ignores a dependency that only exists under node_modules', async () => {
    const root = createScratchDir()
    write(root, 'package.json', JSON.stringify({ name: 'app' }))
    write(
      root,
      'node_modules/@baloise/ds-core/package.json',
      JSON.stringify({ dependencies: { '@baloise/ds-styles': '19.10.2' } }),
    )
    write(
      root,
      'index.html',
      '<link rel="stylesheet" href="node_modules/@baloise/ds-styles/dist/css/design-system.css" />\n',
    )

    const result = await detectBaloise(root, {
      readDistTags: async () => {
        throw new Error('node_modules is not the app install')
      },
    })

    expect(result).toEqual({ status: 'nothing-to-migrate', message: NOTHING })
  })

  it('ignores a comment-only mention', async () => {
    const root = createScratchDir()
    write(root, 'package.json', JSON.stringify({ dependencies: { '@baloise/ds-styles': '19.10.2' } }))
    write(root, 'src/notes.ts', '// import "@baloise/ds-styles/css/design-system"\n')

    const result = await detectBaloise(root, {
      readDistTags: async () => {
        throw new Error('a comment is not an import')
      },
    })

    expect(result).toEqual({ status: 'nothing-to-migrate', message: NOTHING })
  })

  it('detects a React app, pnpm, and aliases for the resolved next version', async () => {
    const root = createScratchDir()
    write(root, 'pnpm-lock.yaml', 'lockfileVersion: 9\n')
    write(
      root,
      'package.json',
      JSON.stringify({
        dependencies: {
          'react': '19.0.0',
          'react-dom': '19.0.0',
          '@baloise/ds-react': '19.10.2',
          '@baloise/ds-styles': '19.10.2',
        },
      }),
    )
    write(
      root,
      'src/main.tsx',
      ["import '@baloise/ds-styles/css/design-system'", "import { BalButton } from '@baloise/ds-react'", ''].join('\n'),
    )

    const result = await detectBaloise(root, { readDistTags: distTags('20.0.0-next.42') })

    expect(result).toEqual({
      status: 'ready',
      packageManager: 'pnpm',
      installCommand: 'pnpm install',
      framework: 'react',
      packageJsonPath: 'package.json',
      dependencies: ['@baloise/ds-react', '@baloise/ds-styles'],
      imports: [
        {
          file: 'src/main.tsx',
          line: 1,
          snippet: "import '@baloise/ds-styles/css/design-system'",
          kind: 'bootstrap',
        },
        {
          file: 'src/main.tsx',
          line: 2,
          snippet: "import { BalButton } from '@baloise/ds-react'",
          kind: 'reference',
        },
      ],
      version: '20.0.0-next.42',
      aliases: {
        '@helvetia/ds-react': 'npm:@baloise/ds-react@20.0.0-next.42',
        '@helvetia/ds-styles': 'npm:@baloise/ds-styles@20.0.0-next.42',
      },
    })
  })

  it('uses a later next tag instead of a hardcoded version', async () => {
    const root = createScratchDir()
    write(
      root,
      'package.json',
      JSON.stringify({ dependencies: { '@baloise/ds-styles': '19.10.2', 'react': '19.0.0' } }),
    )
    write(root, 'src/styles.ts', "import '@baloise/ds-styles/css/design-system'\n")

    const result = await detectBaloise(root, { readDistTags: distTags('20.0.0-next.99') })

    expect(result).toMatchObject({
      status: 'ready',
      version: '20.0.0-next.99',
      aliases: {
        '@helvetia/ds-react': 'npm:@baloise/ds-react@20.0.0-next.99',
        '@helvetia/ds-styles': 'npm:@baloise/ds-styles@20.0.0-next.99',
      },
    })
  })

  it('detects yarn from yarn.lock', async () => {
    const root = createScratchDir()
    write(root, 'yarn.lock', '# yarn lockfile v1\n')
    write(
      root,
      'package.json',
      JSON.stringify({ dependencies: { 'react': '18.0.0', '@baloise/ds-styles': '19.10.2' } }),
    )
    write(root, 'src/index.jsx', "import '@baloise/ds-styles/dist/css/design-system.css'\n")

    const result = await detectBaloise(root, { readDistTags: distTags('20.0.0-next.9') })

    expect(result).toMatchObject({ packageManager: 'yarn', installCommand: 'yarn install' })
  })

  it('detects npm from package-lock.json and defaults to npm when no lockfile exists', async () => {
    const withLock = createScratchDir()
    write(withLock, 'package-lock.json', '{}\n')
    write(withLock, 'package.json', JSON.stringify({ dependencies: { '@baloise/ds-core': '19.10.2' } }))
    write(
      withLock,
      'index.html',
      '<script type="module" src="node_modules/@baloise/ds-core/dist/design-system/design-system.esm.js"></script>\n',
    )

    const locked = await detectBaloise(withLock, { readDistTags: distTags('20.0.0-next.9') })
    expect(locked).toMatchObject({ packageManager: 'npm', installCommand: 'npm install', framework: 'html' })

    const bare = createScratchDir()
    write(bare, 'package.json', JSON.stringify({ devDependencies: { '@baloise/ds-styles': '19.10.2' } }))
    write(
      bare,
      'index.html',
      '<link rel="stylesheet" href="node_modules/@baloise/ds-styles/dist/css/design-system.css" />\n',
    )

    const unlocked = await detectBaloise(bare, { readDistTags: distTags('20.0.0-next.9') })
    expect(unlocked).toMatchObject({
      packageManager: 'npm',
      installCommand: 'npm install',
      framework: 'html',
      dependencies: ['@baloise/ds-styles'],
      aliases: {
        '@helvetia/ds-core': 'npm:@baloise/ds-core@20.0.0-next.9',
        '@helvetia/ds-styles': 'npm:@baloise/ds-styles@20.0.0-next.9',
      },
    })
  })

  it('detects Angular from @angular/core and aliases ds-angular plus ds-styles', async () => {
    const root = createScratchDir()
    write(
      root,
      'package.json',
      JSON.stringify({
        dependencies: {
          '@angular/core': '22.0.0',
          '@baloise/ds-angular': '19.10.2',
          '@baloise/ds-styles': '19.10.2',
        },
      }),
    )
    write(
      root,
      'angular.json',
      JSON.stringify({
        projects: {
          app: {
            architect: {
              build: { options: { styles: ['node_modules/@baloise/ds-styles/dist/css/design-system.css'] } },
            },
          },
        },
      }),
    )

    const result = await detectBaloise(root, { readDistTags: distTags('20.0.0-next.9') })

    expect(result).toMatchObject({
      framework: 'angular',
      packageJsonPath: 'package.json',
      aliases: {
        '@helvetia/ds-angular': 'npm:@baloise/ds-angular@20.0.0-next.9',
        '@helvetia/ds-styles': 'npm:@baloise/ds-styles@20.0.0-next.9',
      },
      imports: [
        {
          file: 'angular.json',
          line: 1,
          kind: 'bootstrap',
        },
      ],
    })
  })

  it('uses the shallowest package.json that depends on Baloise', async () => {
    const root = createScratchDir()
    write(root, 'pnpm-lock.yaml', 'lockfileVersion: 9\n')
    write(root, 'package.json', JSON.stringify({ name: 'workspace', dependencies: { react: '19.0.0' } }))
    write(
      root,
      'apps/web/package.json',
      JSON.stringify({
        dependencies: { '@angular/core': '22.0.0', '@baloise/ds-angular': '19.10.2' },
      }),
    )
    write(
      root,
      'apps/web/legacy/package.json',
      JSON.stringify({ dependencies: { 'react': '18.0.0', '@baloise/ds-react': '19.10.2' } }),
    )
    write(root, 'apps/web/src/styles.scss', "@import '@baloise/ds-styles/css/design-system';\n")

    const result = await detectBaloise(root, { readDistTags: distTags('20.0.0-next.9') })

    expect(result).toMatchObject({
      packageManager: 'pnpm',
      framework: 'angular',
      packageJsonPath: 'apps/web/package.json',
      dependencies: ['@baloise/ds-angular'],
    })
  })

  it('stops with an error when the next dist-tag is missing', async () => {
    const root = createScratchDir()
    write(root, 'package.json', JSON.stringify({ dependencies: { '@baloise/ds-core': '19.10.2' } }))
    write(
      root,
      'index.html',
      '<link rel="stylesheet" href="node_modules/@baloise/ds-styles/dist/css/design-system.css" />\n',
    )

    const result = await detectBaloise(root, { readDistTags: async () => ({ latest: '19.10.2' }) })

    expect(result).toEqual({
      status: 'error',
      message: 'npm view @baloise/ds-core dist-tags did not include a next tag',
    })
  })

  it('prints the detection JSON and exits 0 for a clean stop', async () => {
    const root = createScratchDir()
    write(root, 'package.json', JSON.stringify({ name: 'app' }))
    let text = ''

    const code = await run(root, {
      write(chunk: string) {
        text += chunk
      },
    })

    expect(code).toBe(0)
    expect(JSON.parse(text)).toEqual({ status: 'nothing-to-migrate', message: NOTHING })
  })
})

describe('readNpmDistTags', () => {
  it('asks npm view for the @baloise/ds-core dist-tags', async () => {
    const calls: unknown[][] = []
    const distTags = await readNpmDistTags(async (command: string, args: string[]) => {
      calls.push([command, args])
      return { stdout: JSON.stringify({ latest: '19.10.2', next: '20.0.0-next.9' }) }
    })

    expect(calls).toEqual([['npm', ['view', '@baloise/ds-core', 'dist-tags', '--json']]])
    expect(distTags).toEqual({ latest: '19.10.2', next: '20.0.0-next.9' })
  })
})
