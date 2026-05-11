/**
 * Build script — generates dist/css/*.css and dist/scss/*.scss
 *
 * Run with: node --import tsx/esm src/build.ts
 */
import { createGenerator } from 'unocss'
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileAsync, compileStringAsync } from 'sass'
import { glob } from 'glob'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import { presetDsUtilities, allSafelist } from './preset/index'
import { buildBackgroundRules } from './preset/rules/background'
import { buildBorderRules } from './preset/rules/border'
import { buildBorderColorRules } from './preset/rules/border-color'
import { buildElevationRules } from './preset/rules/elevation'
import { buildTypographyRules } from './preset/rules/typography'
import { buildSpacingRules } from './preset/rules/spacing'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'))

console.log(`
\x1b[35m┃\x1b[0m
\x1b[35m┃\x1b[0m  \x1b[1;37m🧩 Helvetia Design System\x1b[0m
\x1b[35m┃\x1b[0m  \x1b[90m📦 Building CSS Package\x1b[0m
\x1b[35m┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
`)

const processor = postcss([autoprefixer])

async function autoprefix(css: string): Promise<string> {
  const result = await processor.process(css, { from: undefined })
  return result.css
}

// --- Clean dist ---------------------------------------------------------------
rmSync(resolve(__dirname, '../dist'), { recursive: true, force: true })
console.log('\x1b[32m✔\x1b[0m dist/ cleaned')

function banner(description: string): string {
  const year = new Date().getFullYear()
  return [
    '/*!',
    ` * Helvetia Design System — ${description}`,
    ` * @package     ${pkg.name}`,
    ` * @version     ${pkg.version}`,
    ` * @license     ${pkg.license}`,
    ` * @copyright   Copyright © ${year} Helvetia`,
    ` * @homepage    ${pkg.homepage}`,
    ` * @repository  ${pkg.repository.url}`,
    ' */',
    '',
  ].join('\n')
}

// --- Responsive breakpoints ------------------------------------------------
// Each layout/flex/elevation class is also emitted at every breakpoint prefix.
const breakpointPrefixes = [
  'mobile',
  'tablet',
  'tablet-only',
  'touch',
  'desktop',
  'desktop-only',
  'desktop-lg',
  'desktop-xl',
  'desktop-2xl',
]

// Derive the per-breakpoint class list from the safelist:
// only classes that have a responsive counterpart in the SCSS source get prefixed
import { flexSafelist, flexMetadata } from './preset/rules/flex'
import { layoutSafelist, layoutMetadata } from './preset/rules/layout'
import { interactionSafelist, interactionMetadata } from './preset/rules/interaction'
import { sizingMetadata } from './preset/rules/sizing'

const responsiveBase = [...flexSafelist, ...layoutSafelist, ...interactionSafelist]

const tokensJsonPath = resolve(__dirname, '../../tokens/dist/docs/base.tokens.json')
const spacingBuild = buildSpacingRules(tokensJsonPath)
const spacingRules = spacingBuild.rules
const spacingSafelist = spacingBuild.safelist
const bgBuild = buildBackgroundRules(tokensJsonPath)
const bgRules = bgBuild.rules
const bgSafelist = bgBuild.safelist
const borderBuild = buildBorderRules(tokensJsonPath)
const borderRules = borderBuild.rules
const borderSafelist = borderBuild.safelist
const borderColorBuild = buildBorderColorRules(tokensJsonPath)
const borderColorRules = borderColorBuild.rules
const borderColorSafelist = borderColorBuild.safelist
const elevationBuild = buildElevationRules(tokensJsonPath)
const elevationRules = elevationBuild.rules
const elevationSafelist = elevationBuild.safelist
const typographyBuild = buildTypographyRules(tokensJsonPath)
const typographyRules = typographyBuild.rules
const typographySafelist = typographyBuild.safelist
const typographyRawCSS = typographyBuild.rawCSS

// Add elevation to responsive base (z-index and shadow are responsive)
const responsiveBaseWithElevation = [...responsiveBase, ...elevationSafelist]
const fullResponsiveSafelist = breakpointPrefixes.flatMap(bp => responsiveBaseWithElevation.map(cls => `${bp}:${cls}`))

// Shadow pseudo-class variants (derived from elevation safelist)
const shadowClasses = elevationSafelist.filter(cls => cls.startsWith('shadow'))
const pseudoSafelistExtra: string[] = ['hover', 'focus', 'active'].flatMap(p => shadowClasses.map(cls => `${p}:${cls}`))

// Collect metadata for docs
const docsMetadata: Record<string, any> = {
  'spacing': spacingBuild.metadata,
  'flex': flexMetadata,
  'layout': layoutMetadata,
  'interaction': interactionMetadata,
  'sizing': sizingMetadata,
  'background': bgBuild.metadata,
  'border': borderBuild.metadata,
  'border-color': borderColorBuild.metadata,
  'elevation': elevationBuild.metadata,
  'typography': typographyBuild.metadata,
}

// State variants for background (hover:bg-*, focus:bg-*, active:bg-*)
const bgStateSafelist: string[] = ['hover', 'focus', 'active'].flatMap(p => bgSafelist.map(cls => `${p}:${cls}`))

const fullSafelist = [
  ...allSafelist(
    spacingSafelist,
    bgSafelist,
    borderSafelist,
    borderColorSafelist,
    elevationSafelist,
    typographySafelist,
  ),
  ...fullResponsiveSafelist,
  ...pseudoSafelistExtra,
  ...bgStateSafelist,
]

// --- Generate CSS ----------------------------------------------------------
const uno = await createGenerator({
  presets: [
    presetDsUtilities(
      spacingRules,
      spacingSafelist,
      bgRules,
      bgSafelist,
      borderRules,
      borderSafelist,
      borderColorRules,
      borderColorSafelist,
      elevationRules,
      elevationSafelist,
      typographyRules,
      typographyRawCSS,
    ),
  ],
})

const { css } = await uno.generate(new Set(fullSafelist), { preflights: true })
const prefixedUtilities = await autoprefix(css)

// Prepend base.tokens.css so all --ds-* variables are defined in the bundle
const tokensPath = resolve(__dirname, '../../tokens/dist/css/base.tokens.css')
let tokensCss = ''
try {
  tokensCss = readFileSync(tokensPath, 'utf8')
} catch {
  console.warn('Warning: base.tokens.css not found — run `npm run tokens` first.')
}

const output = tokensCss ? `${tokensCss}\n${prefixedUtilities}` : prefixedUtilities

const outDir = resolve(__dirname, '../dist/css')
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'utilities.css'), banner('Utilities') + output)

console.log(`\x1b[32m✔\x1b[0m dist/css/utilities.css written (${output.length} bytes)`)

// --- Write metadata JSON for docs ------------------------------------------
const docsDir = resolve(__dirname, '../dist/docs')
mkdirSync(docsDir, { recursive: true })
writeFileSync(resolve(docsDir, 'design-system.json'), JSON.stringify(docsMetadata, null, 2))

console.log(`\x1b[32m✔\x1b[0m dist/docs/design-system.json written (${Object.keys(docsMetadata).length} categories)`)

// --- Compile base layer (tokens + normalize + structure) -------------------
async function compileSass(entry: string, outPath: string, description: string): Promise<void> {
  const result = await compileAsync(entry, {
    loadPaths: [resolve(__dirname, '../../../node_modules'), resolve(__dirname, '../../..')],
  })
  const prefixed = await autoprefix(result.css)
  const content = banner(description) + prefixed
  writeFileSync(outPath, content)
  const label = outPath.split('/packages/css/')[1] ?? outPath
  console.log(`\x1b[32m✔\x1b[0m ${label} written (${content.length} bytes)`)
}

const scssOutDir = resolve(__dirname, '../dist/scss')
mkdirSync(scssOutDir, { recursive: true })

// Copy SCSS source files so consumers can import from dist/scss/
cpSync(resolve(__dirname, 'scss'), scssOutDir, { recursive: true })
console.log('\x1b[32m✔\x1b[0m dist/scss/ source files copied')

await compileSass(
  resolve(__dirname, 'scss/base.scss'),
  resolve(outDir, 'base.css'),
  'Base (Tokens + Normalize + Structure)',
)

// --- Compile component layer (all *.style.scss from packages/core) ----------
const coreRoot = resolve(__dirname, '../../core/src')
const styleFiles = await glob('**/*.style.scss', { cwd: coreRoot, absolute: false })
styleFiles.sort()

// Build barrel: paths relative to packages/css/src/scss/ (url used by compileStringAsync)
const barrelContent = styleFiles.map(f => `@use '../../../core/src/${f}';`).join('\n')

// FileImporter: redirect @baloise/ds-css/scss/* → packages/css/src/scss/*
// Handles internal monorepo imports during development
const dsStylesImporter = {
  findFileUrl(url: string) {
    if (!url.startsWith('@baloise/ds-css/scss/')) return null
    const rel = url.replace('@baloise/ds-css/scss/', '')
    return new URL(`file://${resolve(__dirname, `scss/${rel}`)}`)
  },
}

const componentResult = await compileStringAsync(barrelContent, {
  url: new URL(`file://${resolve(__dirname, 'scss/_components.scss')}`),
  loadPaths: [resolve(__dirname, '../../../node_modules')],
  importers: [dsStylesImporter],
})
const prefixedComponentCss = await autoprefix(componentResult.css)
const componentCssWithBanner = banner('Components') + prefixedComponentCss
writeFileSync(resolve(outDir, 'component.css'), componentCssWithBanner)
console.log(
  `\x1b[32m✔ dist/css/component.css written (${componentCssWithBanner.length} bytes, ${styleFiles.length} components)`,
)

// --- Write dist/scss/utilities.scss (pre-compiled, no SCSS source) ----------
// UnoCSS output is plain CSS; expose via a forwarding stub for Sass consumers.
const utilitiesScss = `// Auto-generated — utilities are compiled by UnoCSS, not Sass.\n// Use the CSS directly: @import '@baloise/ds-css/css/utilities.css';\n`
writeFileSync(resolve(scssOutDir, 'utilities.scss'), utilitiesScss)
console.log('\x1b[32m✔\x1b[0m dist/scss/utilities.scss written')

// --- Build design-system.css (base + component + utilities concatenated) --------------
const baseCss = readFileSync(resolve(outDir, 'base.css'), 'utf8')
const componentCssContent = readFileSync(resolve(outDir, 'component.css'), 'utf8')
const allCss =
  banner('Full Bundle (Base + Components + Utilities)') + baseCss + '\n' + componentCssContent + '\n' + output
writeFileSync(resolve(outDir, 'design-system.css'), allCss)
console.log(`\x1b[32m✔\x1b[0m dist/css/design-system.css written (${allCss.length} bytes)`)

// --- Build design-system.local.css (fonts with dev path + base + component + utilities)
await compileSass(
  resolve(__dirname, 'scss/base.local.scss'),
  resolve(outDir, 'base.local.css'),
  'Base — Local Dev (Fonts + Tokens + Normalize + Structure)',
)
const baseLocalCss = readFileSync(resolve(outDir, 'base.local.css'), 'utf8')
const allLocalCss =
  banner('Full Bundle — Local Dev (Fonts + Base + Components + Utilities)') +
  baseLocalCss +
  '\n' +
  componentCssContent +
  '\n' +
  output
writeFileSync(resolve(outDir, 'design-system.local.css'), allLocalCss)
writeFileSync(resolve(outDir, 'design-system.local.min.css'), allLocalCss)
console.log(`\x1b[32m✔\x1b[0m dist/css/design-system.local.css written (${allLocalCss.length} bytes)`)

// --- Write dist/scss/design-system.scss (Sass entry that pulls base + component) ------
const allScss = `@use './base';\n// component styles are compiled from packages/core — use component.css directly\n// utilities are UnoCSS-generated — use utilities.css directly\n`
writeFileSync(resolve(scssOutDir, 'design-system.scss'), allScss)
console.log('\x1b[32m✔\x1b[0m dist/scss/design-system.scss written')

// --- Copy CSS files to packages/core/www/assets/css/ ------------------------
const wwwCssDir = resolve(__dirname, '../../core/www/assets/css')
mkdirSync(wwwCssDir, { recursive: true })
cpSync(outDir, wwwCssDir, { recursive: true })
console.log('\x1b[32m✔\x1b[0m dist/css/ copied to packages/core/www/assets/css/')
