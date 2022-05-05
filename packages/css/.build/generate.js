const path = require('path')
const file = require('../../../.build/file.js')
const BaloiseDesignToken = require('../node_modules/@baloise/design-system-next-tokens/dist/tokens').BaloiseDesignToken

const SASS_PATH = path.join(__dirname, '..', 'scss/generated')

async function main() {
  generateBackgroundColors()
  generateTextColors()
  generateBorders()
  generateRadius()
  generateShadow()
  generateTypography()
}

async function generateBackgroundColors() {
  const colors = BaloiseDesignToken.color
  const lines = []

  lines.push(`.has-background-transparent`)
  lines.push(`  background: transparent !important`)
  lines.push(`.has-fill-transparent`)
  lines.push(`  fill: transparent !important`)
  lines.push(`  @include fillSvg(transparent)`)
  lines.push(``)

  for (const color in colors) {
    lines.push(`.has-background-${color}`)
    lines.push(`  background: var(--bal-color-${color}) !important`)
    lines.push(`.has-background-${color}-inverted`)
    lines.push(`  background: var(--bal-color-${color}-inverted) !important`)
    lines.push(`.has-fill-${color}`)
    lines.push(`  fill: var(--bal-color-${color}) !important`)
    lines.push(`  @include fillSvg(var(--bal-color-${color}))`)
    lines.push(`.has-text-${color}-inverted`)
    lines.push(`  color: var(--bal-color-${color}-inverted) !important`)
  }

  await file.write(path.join(SASS_PATH, 'color.background.helpers.sass'), [...lines, ''].join('\n'))
}

async function generateTextColors() {
  const typographyColors = BaloiseDesignToken.typography.colors
  const lines = []

  for (const color in typographyColors) {
    lines.push(`.has-text-${color}`)
    lines.push(`  color: var(--bal-color-${typographyColors[color]}) !important`)
  }

  await file.write(path.join(SASS_PATH, 'color.text.helpers.sass'), [...lines, ''].join('\n'))
}

async function  generateBorders() {
  const borderColors = BaloiseDesignToken.border.colors
  const lines = []
  const pos = ['top', 'left', 'right', 'bottom']

  lines.push(`.has-border-none`)
  lines.push(`  border: none !important`)
  lines.push(``)

  for (let index = 0; index < pos.length; index++) {
    const p = pos[index]
    lines.push(`.has-border-${p}-none`)
    lines.push(`  border-${p}: none !important`)
  }

  for (const c in borderColors) {
    const value = `2px solid var(--bal-color-${borderColors[c]})`
    lines.push(`.has-border-${c}`)
    lines.push(`  border: ${value} !important`)
    lines.push(``)

    for (let index = 0; index < pos.length; index++) {
      const p = pos[index]
      lines.push(`.has-border-${p}-${c}`)
      lines.push(`  border-${p}: ${value} !important`)
      lines.push(``)
    }
  }

  await file.write(path.join(SASS_PATH, 'border.helpers.sass'), [...lines, ''].join('\n'))
}

async function generateRadius() {
  const radius = BaloiseDesignToken.radius
  const lines = []
  for (const r in radius) {
    lines.push(`.has-radius${parseKey(r)}`)
    lines.push(`  border-radius: var(--bal-radius${parseKey(r)}) !important`)
    lines.push(``)

    lines.push(`.has-radius-top${parseKey(r)}`)
    lines.push(`  border-top-left-radius: var(--bal-radius${parseKey(r)}) !important`)
    lines.push(`  border-top-right-radius: var(--bal-radius${parseKey(r)}) !important`)
    lines.push(``)

    lines.push(`.has-radius-top-left${parseKey(r)}`)
    lines.push(`  border-top-left-radius: var(--bal-radius${parseKey(r)}) !important`)
    lines.push(``)

    lines.push(`.has-radius-top-right${parseKey(r)}`)
    lines.push(`  border-top-right-radius: var(--bal-radius${parseKey(r)}) !important`)
    lines.push(``)

    lines.push(`.has-radius-bottom${parseKey(r)}`)
    lines.push(`  border-bottom-left-radius: var(--bal-radius${parseKey(r)}) !important`)
    lines.push(`  border-bottom-right-radius: var(--bal-radius${parseKey(r)}) !important`)
    lines.push(``)

    lines.push(`.has-radius-bottom-left${parseKey(r)}`)
    lines.push(`  border-bottom-left-radius: var(--bal-radius${parseKey(r)}) !important`)
    lines.push(``)

    lines.push(`.has-radius-bottom-right${parseKey(r)}`)
    lines.push(`  border-bottom-right-radius: var(--bal-radius${parseKey(r)}) !important`)
    lines.push(``)
  }

  await file.write(path.join(SASS_PATH, 'radius.helpers.sass'), [...lines, ''].join('\n'))
}

async function generateShadow() {
  const shadow = BaloiseDesignToken.shadow
  const lines = []
  for (const r in shadow) {
    lines.push(`.has-shadow${parseKey(r)}`)
    lines.push(`  box-shadow: var(--bal-shadow${parseKey(r)}) !important`)
    lines.push(``)
  }
  await file.write(path.join(SASS_PATH, 'shadow.helpers.sass'), [...lines, ''].join('\n'))
}

async function generateTypography() {
  const sizes = BaloiseDesignToken.typography.sizes
  const spacing = BaloiseDesignToken.spacing
  const lines = []

  function createCssClasses(key, fontSize, lineHeight, space, indent = '') {
    return `${indent}.title.is-${key},
${indent}.title.is-size-${key},
${indent}.subtitle.is-${key},
${indent}.subtitle.is-size-${key},
${indent}.is-size-${key}
  ${indent}+typography(${fontSize}, ${lineHeight}, ${space})`
  }

  for (const k in sizes.mobile) {
    const s = sizes.mobile[k]
    const space = spacing.mobile[s.spacing]
    lines.push(createCssClasses(k, s.fontSize, s.lineHeight, space))
  }

  if (Object.keys(sizes.tablet).length > 0) {
    lines.push('')
    lines.push('+tablet')
    for (const k in sizes.tablet) {
      const s = sizes.tablet[k]
      const space = spacing.tablet[s.spacing]
      lines.push(createCssClasses(k, s.fontSize, s.lineHeight, space, '  '))
    }
    lines.push('')
  }

  if (Object.keys(sizes.desktop).length > 0) {
    lines.push('')
    lines.push('+desktop')
    for (const k in sizes.desktop) {
      const s = sizes.desktop[k]
      const space = spacing.desktop[s.spacing]
      lines.push(createCssClasses(k, s.fontSize, s.lineHeight, space, '  '))
    }
    lines.push('')
  }

  await file.write(path.join(SASS_PATH, 'typography.helpers.sass'), [...lines, ''].join('\n'))
}

function parseKey(key) {
  if (key === 'normal') {
    return ''
  }
  return '-' + key
}

main()
