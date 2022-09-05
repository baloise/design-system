/**
 * design token - css generator
 * --------------------------------------
 * Generates css helper classes for some of the design tokens.
 */

const path = require('path')
const file = require('./utils/file.js')
const BaloiseDesignToken = require('../packages/tokens/dist/index.js').BaloiseDesignToken

const DIST_PATH = path.join(__dirname, '..', 'packages/tokens/dist')

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

    const typographyColors = BaloiseDesignToken.typography.colors
    for (const color in typographyColors) {
      sassVar(`text-${color}`, `$${typographyColors[color]}`)
      cssVar(`color-text-${color}`, `text-${color}`)
    }

    const borderColors = BaloiseDesignToken.border.colors
    for (const color in borderColors) {
      sassVar(`border-${color}`, `$${borderColors[color]}`)
      cssVar(`color-border-${color}`, `border-${color}`)
    }

    for (const color in colors) {
      if(colors[color].inverted) {
        const invertedColor = colors[colors[color].inverted]
        sassVar(`${color}-inverted`, invertedColor.hex)
        cssVar(`color-${color}-inverted`, `${color}-inverted`)
      }
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
    const weights = typography.weights
    for (const k in weights) {
      sassVar(`weight-${k}`, weights[k])
      cssVar(`weight-${k}`)
    }

    sassVar(`font-family-title`, typography.familyTitle)
    cssVar(`font-family-title`)
    sassVar(`font-family-text`, typography.familyText)
    cssVar(`font-family-text`)

    const sizes = typography.sizes
    for (const k in sizes) {
      sassVar(`size-${k}`, sizes[k].mobile.fontSize)
      cssVar(`size-${k}`)
      sassVar(`line-height-${k}`, sizes[k].mobile.lineHeight)
      cssVar(`line-height-${k}`)
      sassVar(`size-tablet-${k}`, sizes[k].tablet.fontSize)
      cssVar(`size-tablet-${k}`)
      sassVar(`line-height-tablet-${k}`, sizes[k].tablet.lineHeight)
      cssVar(`line-height-tablet-${k}`)
      sassVar(`size-desktop-${k}`, sizes[k].desktop.fontSize)
      cssVar(`size-desktop-${k}`)
      sassVar(`line-height-desktop-${k}`, sizes[k].desktop.lineHeight)
      cssVar(`line-height-desktop-${k}`)
    }
  }

  function generateSpacing() {
    const spacing = BaloiseDesignToken.spacing
    const spaceVariables = []
    const spaceTabletVariables = []
    const spaceDesktopVariables = []

    for (const r in spacing) {
      sassVar(`space-${r}`, spacing[r].mobile)
      cssVar(`space-${r}`)
      spaceVariables.push(`"${r}": $space-${r}`)

      sassVar(`space-tablet-${r}`, spacing[r].tablet)
      cssVar(`space-tablet-${r}`)
      spaceTabletVariables.push(`"${r}": $space-tablet-${r}`)

      sassVar(`space-desktop-${r}`, spacing[r].desktop)
      cssVar(`space-desktop-${r}`)
      spaceDesktopVariables.push(`"${r}": $space-desktop-${r}`)
    }
    sassVar('spacing-values', '(' + spaceVariables.join(', ') + ')')
    sassVar('spacing-values-tablet', '(' + spaceTabletVariables.join(', ') + ')')
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
