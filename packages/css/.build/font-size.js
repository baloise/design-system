const log = require('../../../.build/utils/log')
const utils = require('./utils')

const generate = () => {
  log.list('Font Size CSS Utils')

  const BaloiseDesignToken = require('../../tokens/.tmp/index.js').BaloiseDesignToken
  const sizes = BaloiseDesignToken.typography.sizes
  const lines = []
  const legacyLines = []

  function createCssClasses(key, size, space, indent = '') {
    return `${indent}.is-size-${key},
${indent}.text-${key}
${indent}  font-size: var(--bal-size-${size})
${indent}  line-height: var(--bal-line-height-${size})
${indent}  &:not(:last-child)
${indent}    margin-bottom: var(--bal-space-${space})
`
  }

  for (const k in sizes) {
    const sizeMobile = sizes[k].mobile
    lines.push(createCssClasses(k, k, sizeMobile.spacing))

    const legacy = sizes[k].legacy
    legacyLines.push(createCssClasses(legacy, k, sizeMobile.spacing))
  }

  lines.push('+tablet')
  legacyLines.push('+tablet')
  for (const k in sizes) {
    const sizeTablet = sizes[k].tablet
    lines.push(createCssClasses(k, `tablet-${k}`, sizeTablet.spacing, '  '))

    const legacy = sizes[k].legacy
    legacyLines.push(createCssClasses(legacy, `tablet-${k}`, sizeTablet.spacing, '  '))
  }

  lines.push('+desktop')
  legacyLines.push('+desktop')
  for (const k in sizes) {
    const sizeDesktop = sizes[k].desktop
    lines.push(createCssClasses(k, `desktop-${k}`, sizeDesktop.spacing, '  '))

    const legacy = sizes[k].legacy
    legacyLines.push(createCssClasses(legacy, `desktop-${k}`, sizeDesktop.spacing, '  '))
  }

  return [
    ...lines,
    `// *******************************************`,
    `// LEGACY`,
    `// *******************************************`,
    ...legacyLines,
  ].join(utils.NEWLINE)
}

module.exports = {
  generate,
}
