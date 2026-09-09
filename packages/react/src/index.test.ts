import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const root = dirname(fileURLToPath(import.meta.url))
const generatedSource = readFileSync(join(root, 'generated/components.ts'), 'utf8')
const publicSource = readFileSync(join(root, 'components.ts'), 'utf8')
const indexSource = readFileSync(join(root, 'index.ts'), 'utf8')

const HIDDEN_WRAPPERS = ['DsAlertContainer', 'DsModal', 'DsSnackbar', 'DsToast'] as const

const generatedNames = [...generatedSource.matchAll(/^export const (Ds\w+):/gm)].map(match => match[1])

describe('public API', () => {
  test('does not re-export raw overlay wrappers', () => {
    for (const name of HIDDEN_WRAPPERS) {
      expect(generatedNames).toContain(name)
      expect(publicSource).not.toContain(`${name},`)
      expect(publicSource).not.toMatch(new RegExp(`${name}\\n`))
    }
  })

  test('re-exports every other generated component', () => {
    const missing = generatedNames.filter(name => {
      if ((HIDDEN_WRAPPERS as readonly string[]).includes(name)) return false
      return !publicSource.includes(name)
    })
    expect(missing).toEqual([])
  })

  test('exports overlay idioms from the public barrel', () => {
    expect(indexSource).toContain("export { Modal, useModal } from './idioms/modal'")
    expect(indexSource).toContain("export { useToast } from './idioms/toast'")
    expect(indexSource).toContain("export { useSnackbar } from './idioms/snackbar'")
  })
})
