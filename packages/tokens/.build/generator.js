const path = require('path')
const file = require('../../../.build/file.js')
const BaloiseDesignToken = require('../dist/tokens.js').BaloiseDesignToken

const DIST_PATH = path.join(__dirname, '..', 'dist')

async function main() {
  // JSON
  await file.write(path.join(DIST_PATH, 'tokens.json'), JSON.stringify(BaloiseDesignToken))

  // SASS
  await file.write(path.join(DIST_PATH, 'tokens.sass'), generateSassVariables(BaloiseDesignToken))
}

function generateSassVariables() {
  const scssVariables = []
  const cssVariables = []

  generateBreakpoint()
  generateColors()
  generateGrid()
  generateRadius()
  generateShadow()
  generateTypography()
  generateSpacing()

  return [
    ...scssVariables, '', ':root', ...cssVariables, ''
  ].join('\n')

  function generateColors() {
    const colors = BaloiseDesignToken.color
    for (const color in colors) {
      sassVar(color, colors[color].hex)
      cssVar(`color-${color}`, color)
    }
  }

  function generateBreakpoint() {
    const breakpoints = BaloiseDesignToken.breakpoint
    for (const breakpoint in breakpoints) {
      sassVar(breakpoint, breakpoints[breakpoint])
      cssVar(breakpoint)
    }
  }

  function generateGrid() {
    const grid = BaloiseDesignToken.grid
    sassVar('column-gap', grid.gap)
    cssVar('column-gap')
  }

  function generateRadius() {
    const radius = BaloiseDesignToken.radius
    for (const r in radius) {
      sassVar(`radius${parseKey(r)}`, radius[r].value)
      cssVar(`radius${parseKey(r)}`)
    }
  }

  function generateShadow() {
    const shadow = BaloiseDesignToken.shadow
    for (const r in shadow) {
      sassVar(`shadow${parseKey(r)}`, shadow[r].value)
      cssVar(`shadow${parseKey(r)}`)
    }
  }

  function generateTypography() {
    const typography = BaloiseDesignToken.typography
    const sizes = typography.sizes

    sassVar(`font-family-title`, typography.familyTitle)
    cssVar(`font-family-title`)
    sassVar(`font-family-text`, typography.familyText)
    cssVar(`font-family-text`)

    for (const k in sizes.mobile) {
      sassVar(`size-${k}`, sizes.mobile[k].fontSize)
      cssVar(`size-${k}`)
      sassVar(`line-height-${k}`, sizes.mobile[k].lineHeight)
      cssVar(`line-height-${k}`)
    }

    for (const k in sizes.tablet) {
      sassVar(`size-tablet-${k}`, sizes.tablet[k].fontSize)
      cssVar(`size-tablet-${k}`)
      sassVar(`line-height-tablet-${k}`, sizes.tablet[k].lineHeight)
      cssVar(`line-height-tablet-${k}`)
    }

    for (const k in sizes.desktop) {
      sassVar(`size-desktop-${k}`, sizes.desktop[k].fontSize)
      cssVar(`size-desktop-${k}`)
      sassVar(`line-height-desktop-${k}`, sizes.desktop[k].lineHeight)
      cssVar(`line-height-desktop-${k}`)
    }
  }

  function generateSpacing() {
    const spacing = BaloiseDesignToken.spacing
    const spaceVariables = []
    const spaceTabletVariables = []
    const spaceDesktopVariables = []

    for (const r in spacing.mobile) {
      sassVar(`space${parseKey(r)}`, spacing.mobile[r])
      cssVar(`space${parseKey(r)}`)
      spaceVariables.push(`"${r}": $space-${r}`)
    }
    sassVar('spacing-values', '(' + spaceVariables.join(', ') + ')')

    for (const r in spacing.tablet) {
      sassVar(`space-tablet${parseKey(r)}`, spacing.tablet[r])
      cssVar(`space-tablet${parseKey(r)}`)
      spaceTabletVariables.push(`"${r}": $space-tablet-${r}`)
    }
    sassVar('spacing-values-tablet', '(' + spaceTabletVariables.join(', ') + ')')

    for (const r in spacing.desktop) {
      sassVar(`space-desktop${parseKey(r)}`, spacing.desktop[r])
      cssVar(`space-desktop${parseKey(r)}`)
      spaceDesktopVariables.push(`"${r}": $space-desktop-${r}`)
    }
    sassVar('spacing-values-desktop', '(' + spaceDesktopVariables.join(', ') + ')')

  }

  function sassVar(key, value) {
    return scssVariables.push(`$${key}: ${value} !default`)
  }

  function cssVar(key, sassKey) {
    if(sassKey === undefined) {
      sassKey = key
    }
    return cssVariables.push(`  --bal-${key}: #{$${sassKey}}`)
  }

  function parseKey(key) {
    if (key === 'normal') {
      return ''
    }
    return '-' + key
  }


}

main()
