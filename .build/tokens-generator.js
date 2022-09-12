/**
 * design token - css generator
 * --------------------------------------
 * Generates css helper classes for some of the design tokens.
 */

const path = require('path')
const changeCase = require('change-case')
const log = require('./utils/log.js')
const file = require('./utils/file.js')
const BaloiseDesignToken = require('../packages/tokens/.tmp/index.js').BaloiseDesignToken

const DIST_PATH = path.join(__dirname, '..', 'packages/tokens/dist')
const SRC_PATH = path.join(__dirname, '..', 'packages/tokens/src')

// @type { key: string, legacyKey: string, value: string, alias: value }
const tokens = []
const spaceVariables = []
const spaceTabletVariables = []
const spaceDesktopVariables = []

async function main() {
  log.title('design-tokens - generate')

  generateColors()
  generateBreakpoints()
  generateGrid()
  generateRadius()
  generateShadows()
  generateTypography()
  generateSpacings()


  await file.save(path.join(SRC_PATH, 'tokens.ts'), toTs())
  await file.save(path.join(DIST_PATH, 'tokens.docs.json'), JSON.stringify(BaloiseDesignToken))

  await file.save(path.join(DIST_PATH, 'tokens.json'), toJson())
  await file.save(path.join(DIST_PATH, 'tokens.css'), toCss())
  await file.save(path.join(DIST_PATH, 'tokens.sass'), toSass())
  await file.save(path.join(DIST_PATH, 'tokens.css.sass'), toSassCss())
  await file.save(path.join(DIST_PATH, 'tokens.legacy.sass'), toSassLegacy())
  await file.save(path.join(DIST_PATH, 'tokens.less'), toLess())
}

const ALIAS = 'alias'
const NEWLINE = '\n'
const newAlias = value => `${ALIAS}{${value}}`

const lessKey = (key) => `@bal-${key}`
const sassKey = (key) => `$bal-${key}`
const sassCssKey = (key) => `#{${sassKey(key)}}`
const sassLegacyKey = (key) => `$${key}`
const cssKey = (key) => `--bal-${key}`
const cssVarKey = (key) => `var(${cssKey(key)})`
const jsKey = (key) => changeCase.camelCase(`bal-${key}`).split('_').join('')

const cssVariable = (key, value) => `${key}: ${value};`
const jsonVariable = (key, value) => `"${key}": "${value}"`
const tsVariable = (key, value) => `${key}: '${value}',`
const sassCssVariable = (key, value) => `${key}: ${value}`
const sassVariable = (key, value) => `${key}: ${value} !default`
const lessVariable = (key, value) => `${key}: ${value};`

const parseKey = key => key === 'normal' ? '' : '-' + key

const newToken = (key, legacySassKey, value, aliasValue) => ({ key, legacySassKey, value, aliasValue })

const addToken = (key, legacySassKey, value, aliasValue) => tokens.push(newToken(key, legacySassKey, value, aliasValue))

const isTokenAlias = token => token.value.startsWith(ALIAS)

const cssValue = token => isTokenAlias(token)
  ? cssVarKey(token.value.slice(ALIAS.length + 1, token.value.length - 1))
  : token.value

const jsValue = token => isTokenAlias(token)
  ? token.aliasValue
  : token.value

const sassCssValue = token => isTokenAlias(token)
  ? cssVarKey(token.value.slice(ALIAS.length + 1, token.value.length - 1))
  : sassCssKey(token.key)

const sassValue = token => isTokenAlias(token)
  ? sassKey(token.value.slice(ALIAS.length + 1, token.value.length - 1))
  : token.value

const lessValue = token => isTokenAlias(token)
  ? lessKey(token.value.slice(ALIAS.length + 1, token.value.length - 1))
  : token.value

const toCss = () => [
    ':root {',
    ...tokens.map(token => '  ' + cssVariable(cssKey(token.key), cssValue(token))),
    '}',
    ''
  ].join(NEWLINE)

const toJson = () => [
    '{',
    tokens.map(token => '  ' + jsonVariable(jsKey(token.key), jsValue(token))).join(`,${NEWLINE}`),
    '}',
    ''
  ].join(NEWLINE)

const toTs = () => [
    'export const BaloiseDesignToken = {',
    ...tokens.map(token => '  ' + tsVariable(jsKey(token.key), jsValue(token))),
    '}',
    ''
  ].join(NEWLINE)

const toSassCss = () => [
    ':root',
    ...tokens.map(token => '  ' + sassCssVariable(cssKey(token.key), sassCssValue(token))),
    ''
  ].join(NEWLINE)

const toSassLegacy = () => [
    ...tokens.map(token => sassVariable(sassLegacyKey(token.legacySassKey), sassKey(token.key))),
    ''
  ].join(NEWLINE)

const toSass = () => [
    ...tokens.map(token => sassVariable(sassKey(token.key), sassValue(token))),
    '',
    sassVariable(sassKey('spacing-values'), '(' + spaceVariables.join(', ') + ')'),
    sassVariable(sassKey('spacing-values-tablet'), '(' + spaceTabletVariables.join(', ') + ')'),
    sassVariable(sassKey('spacing-values-desktop'), '(' + spaceDesktopVariables.join(', ') + ')'),
    '',
  ].join(NEWLINE)

const toLess = () => [
  ...tokens.map(token => lessVariable(lessKey(token.key), lessValue(token))),
  '',
].join(NEWLINE)

function generateColors(){
  const colors = BaloiseDesignToken.color
  for (const color in colors) {
    if(colors[color].alias === undefined){
      addToken(`color-${color}`, color, colors[color].hex)
    }
  }
  for (const color in colors) {
    if(colors[color].alias !== undefined){
      addToken(`color-${color}`, color, newAlias(`color-${colors[color].alias}`), colors[colors[color].alias].hex)
    }
  }

  const typographyColors = BaloiseDesignToken.typography.colors
  for (const color in typographyColors) {
    addToken(`color-text-${color}`, `text-${color}`, newAlias(`color-${typographyColors[color]}`), colors[typographyColors[color]].hex)
  }

  const borderColors = BaloiseDesignToken.border.colors
  for (const color in borderColors) {
    addToken(`color-border-${color}`, `border-${color}`, newAlias(`color-${borderColors[color]}`), colors[borderColors[color]].hex)
  }

  for (const color in colors) {
    if(colors[color].inverted) {
      addToken(`color-${color}-inverted`, `${color}-inverted`, newAlias(`color-${colors[color].inverted}`), colors[colors[color].inverted].hex)
    }
  }
}

function generateBreakpoints() {
  const breakpoints = BaloiseDesignToken.breakpoint
  for (const breakpoint in breakpoints) {
    addToken(breakpoint, breakpoint, breakpoints[breakpoint])
  }
}

function generateGrid() {
  const grid = BaloiseDesignToken.grid
  addToken('column-gap', 'column-gap', grid.gap)
}

function generateRadius() {
  const radius = BaloiseDesignToken.radius
  for (const r in radius) {
    addToken(`radius${parseKey(r)}`, `radius${parseKey(r)}`, radius[r].value)
  }
}

function generateShadows() {
  const shadow = BaloiseDesignToken.shadow
  for (const r in shadow) {
    addToken(`shadow${parseKey(r)}`, `shadow${parseKey(r)}`, shadow[r].value)
  }
}

function generateTypography() {
  const typography = BaloiseDesignToken.typography
  const weights = typography.weights
  for (const k in weights) {
    addToken(`weight-${k}`, `weight-${k}`, weights[k])
  }

  addToken(`font-family-title`, `font-family-title`, typography.familyTitle)
  addToken(`font-family-text`, `font-family-text`, typography.familyText)

  const sizes = typography.sizes
  for (const k in sizes) {
    if(sizes[k].alias === undefined){
      addToken(`size-${k}`, `size-${k}`, sizes[k].mobile.fontSize)
      addToken(`line-height-${k}`, `line-height-${k}`, sizes[k].mobile.lineHeight)
      addToken(`size-tablet-${k}`, `size-tablet-${k}`, sizes[k].tablet.fontSize)
      addToken(`line-height-tablet-${k}`, `line-height-tablet-${k}`, sizes[k].tablet.lineHeight)
      addToken(`size-desktop-${k}`, `size-desktop-${k}`, sizes[k].desktop.fontSize)
      addToken(`line-height-desktop-${k}`, `line-height-desktop-${k}`, sizes[k].desktop.lineHeight)
    }
  }

  for (const k in sizes) {
    if(sizes[k].alias !== undefined){
      addToken(`size-${k}`, `size-${k}`, `alias{size-${sizes[k].alias}}`, sizes[sizes[k].alias].mobile.fontSize)
      addToken(`line-height-${k}`, `line-height-${k}`, `alias{line-height-${sizes[k].alias}}`, sizes[sizes[k].alias].mobile.lineHeight)
      addToken(`size-tablet-${k}`, `size-tablet-${k}`, `alias{size-tablet-${sizes[k].alias}}`, sizes[sizes[k].alias].tablet.fontSize)
      addToken(`line-height-tablet-${k}`, `line-height-tablet-${k}`, `alias{line-height-tablet-${sizes[k].alias}}`, sizes[sizes[k].alias].tablet.lineHeight)
      addToken(`size-desktop-${k}`, `size-desktop-${k}`, `alias{size-desktop-${sizes[k].alias}}`, sizes[sizes[k].alias].desktop.fontSize)
      addToken(`line-height-desktop-${k}`, `line-height-desktop-${k}`, `alias{line-height-desktop-${sizes[k].alias}}`, sizes[sizes[k].alias].desktop.lineHeight)
    }
  }
}

function generateSpacings() {
  const spacing = BaloiseDesignToken.spacing

  for (const r in spacing) {
    if(spacing[r].alias === undefined){
      addToken(`space-${r}`, `space-${r}`, spacing[r].mobile)
      addToken(`space-tablet-${r}`, `space-tablet-${r}`, spacing[r].tablet)
      addToken(`space-desktop-${r}`, `space-desktop-${r}`, spacing[r].desktop)
    }
  }
  for (const r in spacing) {
    if(spacing[r].alias !== undefined){
      addToken(`space-${r}`, `space-${r}`, `alias{space-${spacing[r].alias}}`, spacing[spacing[r].alias].mobile)
      addToken(`space-tablet-${r}`, `space-tablet-${r}`, `alias{space-tablet-${spacing[r].alias}}`, spacing[spacing[r].alias].tablet)
      addToken(`space-desktop-${r}`, `space-desktop-${r}`, `alias{space-desktop-${spacing[r].alias}}`, spacing[spacing[r].alias].desktop)
    }
  }
  for (const r in spacing) {
    spaceVariables.push(`"${r}": ${sassKey(`space-${r}`)}`)
    spaceTabletVariables.push(`"${r}": ${sassKey(`space-tablet-${r}`)}`)
    spaceDesktopVariables.push(`"${r}": ${sassKey(`space-desktop-${r}`)}`)
  }
}

main()
