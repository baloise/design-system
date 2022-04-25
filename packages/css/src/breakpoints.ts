import { BaloiseDesignToken } from '@baloise/design-system-next-tokens'
import path from 'path'
import { write } from './file'

export async function generateBreakpoint() {
  const breakpoints = BaloiseDesignToken.breakpoint as any
  const scssVariables = []
  const cssVariables = []

  for (const breakpoint in breakpoints) {
    scssVariables.push(`$${breakpoint}: ${breakpoints[breakpoint]} !default`)
    cssVariables.push(`  --bal-${breakpoint}: #{$${breakpoint}}`)
  }

  await write(
    path.join(__dirname, '..', 'scss/generated/breakpoint.sass'),
    [...scssVariables, '', ':root', ...cssVariables, ''].join('\n'),
  )
}
