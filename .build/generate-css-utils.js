/**
 * generate sass util classes
 * --------------------------------------
 * This script creates from the design tokens some css helper classes
 */

const path = require('path')
const file = require('./utils/file.js')
const BaloiseDesignToken = require('../packages/tokens/.tmp/index.js').BaloiseDesignToken

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/css");
const SASS_PATH = path.join(PACKAGE, 'src/generated')

async function main() {
  generateBackgroundColors()
  generateTextColors()
  generateBorders()
  generateRadius()
  generateShadow()
  generateTypography()
  generateZIndex()
}

async function generateBackgroundColors() {
  const colors = BaloiseDesignToken.color
  const lines = []

  lines.push(`.has-background-transparent`)
  lines.push(`  background: transparent !important`)

  for (const color in colors) {
    lines.push(`.has-background-${color}`)
    lines.push(`  background: var(--bal-color-${color}) !important`)
  }

  const invertedWhiteLines = []
  const invertedPrimaryLines = []
  for (const color in colors) {
    const inverted = colors[color].inverted
    if(inverted === 'white'){
      invertedWhiteLines.push(color)
    }else{
      invertedPrimaryLines.push(color)
    }
  }

  lines.push(``)
  lines.push(invertedWhiteLines.map(l => `.has-text-${l}-inverted`).join(',\n'))
  lines.push(`  color: var(--bal-color-white) !important`)

  lines.push(``)
  lines.push(invertedPrimaryLines.map(l => `.has-text-${l}-inverted`).join(',\n'))
  lines.push(`  color: var(--bal-color-primary) !important`)

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
  for (const r in shadow.box) {
    lines.push(`.has-shadow${parseKey(r)}`)
    lines.push(`  box-shadow: var(--bal-shadow${parseKey(r)}) !important`)
    lines.push(``)
  }
  for (const r in shadow.text) {
    lines.push(`.has-text-shadow${parseKey(r)}`)
    lines.push(`  text-shadow: var(--bal-text-shadow${parseKey(r)}) !important`)
    lines.push(``)
  }
  await file.write(path.join(SASS_PATH, 'shadow.helpers.sass'), [...lines, ''].join('\n'))
}

async function generateZIndex() {
  const zIndex = BaloiseDesignToken.zIndex
  const lines = []
  for (const r in zIndex) {
    lines.push(`.has-z-index-${r}`)
    lines.push(`  z-index: var(--bal-z-index-${r}) !important`)
    lines.push(``)
  }
  await file.write(path.join(SASS_PATH, 'z-index.helpers.sass'), [...lines, ''].join('\n'))
}

async function generateTypography() {
  const sizes = BaloiseDesignToken.typography.sizes
  const lines = []
  const legacyLines = []

  function createCssClasses(key, size, space, indent = '') {
    return `${indent}.is-size-${key}
${indent}  font-size: var(--bal-size-${size})
${indent}  line-height: var(--bal-line-height-${size})
${indent}  &:not(:last-child)
${indent}    margin-bottom: var(--bal-space-${space})`
  }

  for (const k in sizes) {
    const sizeMobile = sizes[k].mobile
    lines.push(createCssClasses(k, k, sizeMobile.spacing))

    const legacy = sizes[k].legacy
    legacyLines.push(createCssClasses(legacy, k, sizeMobile.spacing))
  }

  lines.push('')
  legacyLines.push('')
  lines.push('+tablet')
  legacyLines.push('+tablet')
  for (const k in sizes) {
    const sizeTablet = sizes[k].tablet
    lines.push(createCssClasses(k, `tablet-${k}`, sizeTablet.spacing, '  '))

    const legacy = sizes[k].legacy
    legacyLines.push(createCssClasses(legacy, `tablet-${k}`, sizeTablet.spacing, '  '))
  }

  lines.push('')
  legacyLines.push('')
  lines.push('+desktop')
  legacyLines.push('+desktop')
  for (const k in sizes) {
    const sizeDesktop = sizes[k].desktop
    lines.push(createCssClasses(k, `desktop-${k}`, sizeDesktop.spacing, '  '))

    const legacy = sizes[k].legacy
    legacyLines.push(createCssClasses(legacy, `desktop-${k}`, sizeDesktop.spacing, '  '))
  }

  await file.write(path.join(SASS_PATH, 'typography.helpers.sass'), [...lines, ''].join('\n'))
  await file.write(path.join(SASS_PATH, 'typography.legacy.helpers.sass'), [...legacyLines, ''].join('\n'))
}

function parseKey(key) {
  return '-' + key
}

main()
