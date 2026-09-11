import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const root = dirname(fileURLToPath(import.meta.url))
const generatedSource = readFileSync(join(root, 'generated/components.ts'), 'utf8')
const publicSource = readFileSync(join(root, 'wrappers.ts'), 'utf8')
const indexSource = readFileSync(join(root, 'index.ts'), 'utf8')
const hooksSource = readFileSync(join(root, 'hooks/index.ts'), 'utf8')

const DEPRECATED_WRAPPERS = ['DsAlertContainer', 'DsApp', 'DsModal', 'DsSnackbar', 'DsToast'] as const

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

  test('exports overlay components and hooks from the public barrel', () => {
    expect(indexSource).toContain("export { Modal } from './components/modal'")
    expect(indexSource).toContain("export * from './hooks'")
    expect(hooksSource).toContain("export { useModal } from './use-modal'")
    expect(hooksSource).toContain("export { useToast } from './use-toast'")
    expect(hooksSource).toContain("export { useSnackbar } from './use-snackbar'")
  })

  test('does not export internal hooks', () => {
    expect(hooksSource).not.toContain('use-alert-controller')
  })
})
