import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { describe, expect, test } from 'vitest'

const root = dirname(fileURLToPath(import.meta.url))
const pkgRoot = join(root, '..')
const generatedSource = readFileSync(join(root, 'generated/components.ts'), 'utf8')
const publicSource = readFileSync(join(root, 'wrappers.ts'), 'utf8')
const indexSource = readFileSync(join(root, 'index.ts'), 'utf8')
const hooksSource = readFileSync(join(root, 'hooks/index.ts'), 'utf8')

const DEPRECATED_WRAPPERS = ['DsAlertContainer', 'DsModal', 'DsSnackbar', 'DsToast'] as const

const generatedNames = [...generatedSource.matchAll(/^export const (Ds\w+):/gm)].map(match => match[1])

describe('public API', () => {
  test('marks overlay wrappers as deprecated', () => {
    for (const name of DEPRECATED_WRAPPERS) {
      expect(generatedNames).toContain(name)
      expect(publicSource).toMatch(new RegExp(`@deprecated[\\s\\S]{0,400}export \\{ ${name} \\}`))
    }
  })

  test('re-exports every generated component', () => {
    const missing = generatedNames.filter(name => !publicSource.includes(name))
    expect(missing).toEqual([])
  })

  test('exports overlay components, DsRootProvider, and hooks from the public barrel', () => {
    expect(indexSource).toContain("export { DsRootProvider } from './components/ds-root-provider'")
    expect(indexSource).toContain("export { Modal } from './components/modal'")
    expect(indexSource).toContain("export * from './hooks'")
    expect(hooksSource).toContain("export { useModal } from './use-modal'")
    expect(hooksSource).toContain("export { useToast } from './use-toast'")
    expect(hooksSource).toContain("export { useSnackbar } from './use-snackbar'")
  })

  test('marks bootstrapDesignSystem as deprecated', () => {
    const bootstrapSource = readFileSync(join(root, 'bootstrap.ts'), 'utf8')
    expect(bootstrapSource).toMatch(/@deprecated[\s\S]{0,400}export const bootstrapDesignSystem/)
    expect(indexSource).toContain("export { bootstrapDesignSystem } from './bootstrap'")
  })

  test('does not export internal hooks', () => {
    expect(hooksSource).not.toContain('use-alert-controller')
  })
})

describe('client/server entry split', () => {
  const pkg = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8')) as {
    exports?: {
      '.'?: {
        node?: { types?: string; default?: string }
        types?: string
        default?: string
      }
    }
  }

  test('server barrel re-exports generated server components and authored public API', () => {
    expect(existsSync(join(root, 'index.server.ts'))).toBe(true)

    const serverIndexSource = readFileSync(join(root, 'index.server.ts'), 'utf8')
    expect(serverIndexSource).toContain("export { bootstrapDesignSystem } from './bootstrap'")
    expect(serverIndexSource).toContain("export type * from './generated/components.server'")
    expect(serverIndexSource).toContain("export * from './wrappers.server'")
    expect(serverIndexSource).toContain("export { DsRootProvider } from './components/ds-root-provider.server'")
    expect(serverIndexSource).toContain("export { Modal } from './components/modal'")
    expect(serverIndexSource).toContain("export * from './hooks'")
  })

  test('server wrappers match client wrappers except the generated module', () => {
    const clientWrappers = readFileSync(join(root, 'wrappers.ts'), 'utf8')
    const serverWrappers = readFileSync(join(root, 'wrappers.server.ts'), 'utf8')
    expect(serverWrappers).toBe(
      clientWrappers.replaceAll("from './generated/components'", "from './generated/components.server'"),
    )
  })

  test('marks overlay idioms as client-only', () => {
    const useClient = /^['"]use client['"]/
    expect(readFileSync(join(root, 'components/modal.tsx'), 'utf8')).toMatch(useClient)
    expect(readFileSync(join(root, 'hooks/use-toast.ts'), 'utf8')).toMatch(useClient)
    expect(readFileSync(join(root, 'hooks/use-snackbar.ts'), 'utf8')).toMatch(useClient)
    expect(readFileSync(join(root, 'hooks/use-modal.ts'), 'utf8')).toMatch(useClient)
    expect(readFileSync(join(root, 'components/ds-root-provider.tsx'), 'utf8')).toMatch(useClient)
    expect(readFileSync(join(root, 'components/ds-root-provider.server.tsx'), 'utf8')).not.toMatch(useClient)
    expect(readFileSync(join(root, 'components/ds-root-provider.shared.tsx'), 'utf8')).not.toMatch(useClient)
    expect(readFileSync(join(root, 'components/ds-root-provider.server.tsx'), 'utf8')).toContain(
      "from '../generated/components.server'",
    )
  })

  test('exports map routes the node condition to the server entry', () => {
    expect(pkg.exports?.['.']).toMatchObject({
      node: {
        types: './dist/index.server.d.ts',
        default: './dist/index.server.js',
      },
      types: './dist/index.d.ts',
      default: './dist/index.js',
    })
  })

  test('requiring the package under Node resolves the server entry', () => {
    const resolved = execFileSync(
      process.execPath,
      ['--conditions=node', '--input-type=module', '-e', "console.log(import.meta.resolve('@baloise/ds-react'))"],
      { cwd: pkgRoot, encoding: 'utf8' },
    ).trim()

    expect(resolved).toBe(pathToFileURL(join(pkgRoot, 'dist/index.server.js')).href)
  })

  test('patched server wrappers use the hydration-safe SSR factory', () => {
    const patched = readFileSync(join(pkgRoot, 'dist/generated/components.server.js'), 'utf8')
    expect(patched).toContain("from '../ssr-create-component.js'")
    expect(patched).not.toContain("from '@stencil/react-output-target/ssr'")
    expect(patched).toContain('typeof window === "undefined" ? {} : await import("./components.js")')
    expect(patched.startsWith("'use client'")).toBe(false)
  })

  test('default resolution still gets the client entry', () => {
    const resolved = execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `import { registerHooks } from 'node:module'
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === '@baloise/ds-react') {
      return nextResolve(specifier, { ...context, conditions: ['import', 'default'] })
    }
    return nextResolve(specifier, context)
  },
})
console.log(import.meta.resolve('@baloise/ds-react'))`,
      ],
      { cwd: pkgRoot, encoding: 'utf8' },
    ).trim()

    expect(resolved).toBe(pathToFileURL(join(pkgRoot, 'dist/index.js')).href)
  })
})
