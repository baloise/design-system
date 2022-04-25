import { BaloiseDesignToken } from '@baloise/design-system-next-tokens'
import path from 'path'
import { write } from './file'

function parseKey(key: string) {
  if (key === 'normal') {
    return ''
  }
  return '-' + key
}

export async function generateRadius() {
  const radius = BaloiseDesignToken.radius as any
  const scssVariables = []
  const cssVariables = []

  for (const r in radius) {
    scssVariables.push(`$radius${parseKey(r)}: ${radius[r].value} !default`)
    cssVariables.push(`  --bal-radius${parseKey(r)}: #{$radius${parseKey(r)}}`)
  }

  await write(
    path.join(__dirname, '..', 'scss/generated/radius.sass'),
    [...scssVariables, '', ':root', ...cssVariables, ''].join('\n'),
  )

  const helpers = []
  for (const r in radius) {
    helpers.push(`.has-radius${parseKey(r)}`)
    helpers.push(`  border-radius: var(--bal-radius${parseKey(r)})`)
    helpers.push(``)

    helpers.push(`.has-radius-top${parseKey(r)}`)
    helpers.push(`  border-top-left-radius: var(--bal-radius${parseKey(r)})`)
    helpers.push(`  border-top-right-radius: var(--bal-radius${parseKey(r)})`)
    helpers.push(``)

    helpers.push(`.has-radius-top-left${parseKey(r)}`)
    helpers.push(`  border-top-left-radius: var(--bal-radius${parseKey(r)})`)
    helpers.push(``)

    helpers.push(`.has-radius-top-right${parseKey(r)}`)
    helpers.push(`  border-top-right-radius: var(--bal-radius${parseKey(r)})`)
    helpers.push(``)

    helpers.push(`.has-radius-bottom${parseKey(r)}`)
    helpers.push(`  border-bottom-left-radius: var(--bal-radius${parseKey(r)})`)
    helpers.push(`  border-bottom-right-radius: var(--bal-radius${parseKey(r)})`)
    helpers.push(``)

    helpers.push(`.has-radius-bottom-left${parseKey(r)}`)
    helpers.push(`  border-bottom-left-radius: var(--bal-radius${parseKey(r)})`)
    helpers.push(``)

    helpers.push(`.has-radius-bottom-right${parseKey(r)}`)
    helpers.push(`  border-bottom-right-radius: var(--bal-radius${parseKey(r)})`)
    helpers.push(``)
  }

  await write(
    path.join(__dirname, '..', 'scss/generated/radius.sass'),
    [...scssVariables, '', ':root', ...cssVariables, '', ...helpers, ''].join('\n'),
  )
}
