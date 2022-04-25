import { BaloiseDesignToken } from '@baloise/design-system-next-tokens'
import path from 'path'
import { write } from './file'

export async function generateBorders() {
  const colors = BaloiseDesignToken.color as any

  const helpers = []
  const pos = ['top', 'left', 'right', 'bottom']

  helpers.push(`.has-border-none`)
  helpers.push(`  border: none`)
  helpers.push(``)

  for (let index = 0; index < pos.length; index++) {
    const p = pos[index]
    helpers.push(`.has-border-${p}-none`)
    helpers.push(`  border-${p}: none`)
    helpers.push(``)
  }

  for (const c in colors) {
    const value = `2px solid var(--bal-color-${c})`
    helpers.push(`.has-border-${c}`)
    helpers.push(`  border: ${value}`)
    helpers.push(``)

    for (let index = 0; index < pos.length; index++) {
      const p = pos[index]
      helpers.push(`.has-border-${p}-${c}`)
      helpers.push(`  border-${p}: ${value}`)
      helpers.push(``)
    }
  }

  await write(path.join(__dirname, '..', 'scss/generated/border.sass'), [...helpers, ''].join('\n'))
}
