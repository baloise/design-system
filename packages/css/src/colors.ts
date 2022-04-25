import { BaloiseDesignToken, BaloiseDesignTokenColors } from '@baloise/design-system-next-tokens'
import path from 'path'
import { write } from './file'

export async function generateColors() {
  const colors = BaloiseDesignToken.color
  generateVariables(colors)
  generateHelpers(colors)
}

async function generateVariables(colors: BaloiseDesignTokenColors) {
  const scssVariables = []
  const cssVariables = []

  for (const color in colors) {
    scssVariables.push(`$${color}: ${colors[color].hex} !default`)
    cssVariables.push(`  --bal-color-${color}: #{$${color}}`)
  }

  await write(
    path.join(__dirname, '..', 'scss/generated/color.sass'),
    [...scssVariables, '', ':root', ...cssVariables, ''].join('\n'),
  )
}

async function generateHelpers(colors: BaloiseDesignTokenColors) {
  const lines = []

  for (const color in colors) {
    lines.push(`.has-background-${color}`)
    lines.push(`  background: var(--bal-color-${color})`)
    lines.push(``)
    lines.push(`.has-text-${color}`)
    lines.push(`  color: var(--bal-color-${color})`)
    lines.push(``)
  }

  await write(path.join(__dirname, '..', 'scss/generated/color-helpers.sass'), [...lines, ''].join('\n'))
}
