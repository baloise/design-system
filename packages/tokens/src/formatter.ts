import StyleDictionary, { Dictionary } from 'style-dictionary'
import { fileHeader, formattedVariables } from 'style-dictionary/utils'
import { propertyFormatNames } from 'style-dictionary/enums'
import type { TransformedToken } from 'style-dictionary/types'
import {
  RESPONSIVE_DIMENSION_EXTENSION_KEY,
  dimensionValueToCss,
  type TypographyCssValue,
} from './css-value.js'
import { tokenNameToCssVar } from './css-naming.js'

/**
 * `formattedVariables` (used by both formatters below) renders exactly one CSS declaration per
 * token in `dictionary.allTokens`, using that token's own `.value` as the declaration's value. A
 * typography token's `.value` (post `ds/typography` transform) is a `{fontFamily, fontSize,
 * fontWeight, lineHeight}` object, not a CSS-ready string — printed as-is it would render as
 * `[object Object]`. This collapses every `$type: "typography"` token's value into a single CSS
 * `font` shorthand string (`<weight> <size>/<line-height> <family>`) *before* the token list
 * reaches `formattedVariables`, in place — unlike border/shadow (also composites), a typography
 * token keeps its own bare name; no suffixing/expansion needed since it now produces exactly one
 * declaration, same as any other composite. A typography token whose transform produced `null`
 * (malformed) is dropped silently rather than emitting a declaration with a blank value.
 *
 * Each field is resolved independently rather than trusting Style Dictionary's own
 * `outputReferences` (which only rewrites a token's *entire* value against another token's, and
 * can't rewrite one field inside a hand-built shorthand string). A field whose raw (pre-transform)
 * value is a `{reference}` gets rendered as a `var(--...)`/`$...` reference via `wrapReference`;
 * everything else falls back to its already-resolved literal from `css`.
 *
 * A field (in practice: `fontSize`) that references a *responsive* dimension token (one carrying
 * `$extensions[RESPONSIVE_DIMENSION_EXTENSION_KEY]`, e.g. `Alias.Text.Size.3XL`) is special-cased
 * to reference that alias's `-device` var instead of its bare one. Style Dictionary's own
 * `outputReferences` has no notion of the `-mobile`/`-tablet`/`-desktop`/`-device` convention — left
 * alone it renders the bare `var(--ds-alias-text-size-3xl)`, which mirrors only the alias's mobile
 * value (decision 4 in docs/plans/responsive-dimension-token-plan.md) and never changes at wider
 * breakpoints. The `-device` var, by contrast, gets redefined inside this same formatter's
 * `@media` blocks (see `ds/css/variables-responsive`/`-brand` below), so referencing it is what
 * makes a typography token like `--ds-heading-bold-level1` responsive without itself needing a
 * per-breakpoint redeclaration. CSS-only (`referenceSyntax === 'css'`): the SCSS platform never
 * emits `-device` vars (no media queries there), so its bare reference is left untouched.
 */
function expandTypographyTokens(tokens: TransformedToken[], referenceSyntax: ReferenceSyntax): TransformedToken[] {
  const responsiveDimensionPaths = new Set<string>()
  for (const token of tokens) {
    const extensions = token.original?.$extensions as Record<string, unknown> | undefined
    if (token.$type === 'dimension' && isRawResponsiveDimensionValue(extensions?.[RESPONSIVE_DIMENSION_EXTENSION_KEY])) {
      responsiveDimensionPaths.add(token.path.join('.'))
    }
  }

  const resolveField = (
    css: TypographyCssValue,
    field: keyof TypographyCssValue,
    originalValue: Partial<Record<keyof TypographyCssValue, unknown>> | undefined,
  ): string => {
    const rawField = originalValue?.[field]
    const refMatch = typeof rawField === 'string' ? /^\{(.+)\}$/.exec(rawField) : null
    if (!referenceSyntax || !refMatch) return css[field]
    if (referenceSyntax === 'css' && responsiveDimensionPaths.has(refMatch[1])) {
      return `var(--${tokenNameToCssVar(refMatch[1].split('.'))}-device)`
    }
    return wrapReference(refMatch[1], referenceSyntax)
  }

  const expanded: TransformedToken[] = []
  for (const token of tokens) {
    if (token.$type !== 'typography') {
      expanded.push(token)
      continue
    }
    // Style Dictionary stores the post-transform result on `$value`, not `value`, once a token has
    // passed through a `usesDtcg: true` pipeline (which every caller of formattedVariables below
    // is) — `token.value` is `undefined` here even though `ds/typography`'s transform runs fine.
    const css = (token.$value ?? token.value) as TypographyCssValue | null | undefined
    if (!css) continue
    const originalValue = token.original?.$value as Partial<Record<keyof TypographyCssValue, unknown>> | undefined

    const fontWeight = resolveField(css, 'fontWeight', originalValue)
    const fontSize = resolveField(css, 'fontSize', originalValue)
    const lineHeight = resolveField(css, 'lineHeight', originalValue)
    const fontFamily = resolveField(css, 'fontFamily', originalValue)
    const shorthand = `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`

    expanded.push({
      ...token,
      value: shorthand,
      $value: shorthand,
      original: { ...token.original, $value: shorthand },
    })
  }
  return expanded
}

interface RawResponsiveDimensionValue {
  mobile: unknown
  tablet: unknown
  desktop: unknown
}

function isRawResponsiveDimensionValue(value: unknown): value is RawResponsiveDimensionValue {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return 'mobile' in v && 'tablet' in v && 'desktop' in v
}

// Which reference syntax (if any) a resolvable breakpoint reference should render as — `var(--x)`
// for the CSS platforms, `$x` for the SCSS platform (matching Style Dictionary's own per-format
// `outputReferences` rendering: `createPropertyFormatter` picks the same syntax split by
// `propertyFormatNames.css` vs `.sass`), or `false` to always inline the resolved literal.
type ReferenceSyntax = 'css' | 'sass' | false

const wrapReference = (path: string, syntax: 'css' | 'sass'): string => {
  const name = tokenNameToCssVar(path.split('.'))
  return syntax === 'css' ? `var(--${name})` : `$${name}`
}

/**
 * Resolves one breakpoint value to a CSS/SCSS-ready string. A literal {value, unit} converts
 * directly (dimensionValueToCss); a `{reference}` string can't be resolved by Style Dictionary's
 * own reference resolver — that only ever walks $value, never $extensions (see
 * docs/plans/responsive-dimension-token-plan.md's "Open technical question") — so it's looked up
 * here instead, against every other dimension token's own already-transformed (post `ds/dimension`)
 * CSS value, keyed by its original DTCG path (e.g. "🌐 Global.📏 Dimension.Space16", matching the
 * braces-stripped form of the `{reference}` string as authored in Base.tokens.json). When
 * `referenceSyntax` is set (as it is on every platform that calls this, matching that platform's
 * own `outputReferences`), a resolvable reference renders as a `var(--...)`/`$...` reference
 * instead of its literal value — matching how Style Dictionary's own reference resolution already
 * renders every *non*-responsive alias (e.g. `--ds-alias-background-color-white: var(--ds-global-
 * color-white)` in CSS, `$ds-alias-background-color-white: $ds-global-color-white` in SCSS);
 * `cssByPath` still gates this on the target actually existing as a real dimension declaration in
 * this dictionary, so an unresolvable reference still degrades the same way it always has.
 */
function resolveResponsiveBreakpointCss(
  raw: unknown,
  cssByPath: Map<string, string>,
  referenceSyntax: ReferenceSyntax,
): string | null {
  if (typeof raw === 'string') {
    const match = /^\{(.+)\}$/.exec(raw)
    if (!match) return null
    if (!cssByPath.has(match[1])) return null
    return referenceSyntax ? wrapReference(match[1], referenceSyntax) : (cssByPath.get(match[1]) ?? null)
  }
  return dimensionValueToCss(raw)
}

/**
 * Mirrors expandTypographyTokens's technique (see its own comment above), fanning one responsive
 * dimension token out into 3 clones (mobile/tablet/desktop) *before* the existing
 * -mobile/-tablet/-desktop -> -device media-query splitting below. That splitting logic already
 * operates purely on name suffixes, with no idea whether they came from the pre-existing
 * sibling-token pattern or this expansion — so it needs zero code changes to also handle these
 * (Phase 2's "key design win", see the plan). A malformed responsive token (an unresolvable
 * breakpoint) degrades to its own plain $value/bare name instead of being dropped entirely —
 * decision 4 already keeps $value mirroring mobile, so that's still a real, valid dimension value
 * on its own; this is the DTCG-degradation behavior the whole $extensions design exists for.
 */
function expandResponsiveDimensionTokens(
  tokens: TransformedToken[],
  referenceSyntax: ReferenceSyntax,
): TransformedToken[] {
  const cssByPath = new Map<string, string>()
  for (const token of tokens) {
    const value = token.$value ?? token.value
    if (token.$type === 'dimension' && typeof value === 'string') {
      cssByPath.set(token.path.join('.'), value)
    }
  }

  const expanded: TransformedToken[] = []
  for (const token of tokens) {
    const extensions = token.original?.$extensions as Record<string, unknown> | undefined
    const responsive = token.$type === 'dimension' ? extensions?.[RESPONSIVE_DIMENSION_EXTENSION_KEY] : undefined
    if (!isRawResponsiveDimensionValue(responsive)) {
      expanded.push(token)
      continue
    }

    const mobile = resolveResponsiveBreakpointCss(responsive.mobile, cssByPath, referenceSyntax)
    const tablet = resolveResponsiveBreakpointCss(responsive.tablet, cssByPath, referenceSyntax)
    const desktop = resolveResponsiveBreakpointCss(responsive.desktop, cssByPath, referenceSyntax)
    if (mobile === null || tablet === null || desktop === null) {
      expanded.push(token)
      continue
    }

    for (const [breakpoint, cssValue] of [
      ['mobile', mobile],
      ['tablet', tablet],
      ['desktop', desktop],
    ] as const) {
      // Each clone gets its own `original.$value: undefined` — same "don't leave a
      // reference-shaped original.$value shared across clones" defensiveness expandTypographyTokens
      // needed for outputReferences (see its own comment) — there's no meaningful per-breakpoint
      // original sub-value to narrow to here the way typography's per-field narrowing has, so this
      // just removes it instead.
      expanded.push({
        ...token,
        name: `${token.name}-${breakpoint}`,
        value: cssValue,
        $value: cssValue,
        original: { ...token.original, $value: undefined },
      })
    }
  }
  return expanded
}

// Every token's `path[0]` is one of these three top-level source-tree groups, in the order Style
// Dictionary is fed the DTCG source (see `tokens/Base.tokens.json`'s top-level keys). Untouched by
// `name/kebab` or any other transform — those only ever rewrite `.name`/`.value`, never `.path` —
// so grouping by `path[0]` stays reliable no matter which format/transform pipeline ran first.
const TOKEN_ORIGIN_GROUPS: { pathSegment: string; label: string }[] = [
  { pathSegment: '🌐 Global', label: 'Global tokens' },
  { pathSegment: '🔗 Alias', label: 'Alias tokens' },
  { pathSegment: '🧩 Component', label: 'Component tokens' },
]

/**
 * Thin wrapper around `formattedVariables` that partitions `dictionary.allTokens` into
 * Global/Alias/Component groups (see TOKEN_ORIGIN_GROUPS) and renders each through
 * `formattedVariables` under its own `/* ... *\/` comment header, in that fixed order — so
 * generated output always reads primitives first, then their semantic aliases, then
 * component-level overrides, regardless of source JSON key order or any prior name-based
 * splitting (e.g. the -mobile/-tablet/-desktop dictionaries built above). A group with no tokens
 * is omitted entirely rather than emitting an empty header.
 */
function formattedVariablesByOrigin(
  params: Omit<Parameters<typeof formattedVariables>[0], 'dictionary'> & { dictionary: Dictionary; indent?: string },
): string {
  const { dictionary, indent = '  ', ...rest } = params
  return TOKEN_ORIGIN_GROUPS.map(({ pathSegment, label }) => {
    const allTokens = dictionary.allTokens.filter(token => token.path[0] === pathSegment)
    if (allTokens.length === 0) return null
    const groupDictionary = { ...dictionary, allTokens } as Dictionary
    return `${indent}/* ${label} */\n` + formattedVariables({ ...rest, dictionary: groupDictionary })
  })
    .filter((group): group is string => group !== null)
    .join('\n\n')
}

export const registerCustomFormatters = (sd: typeof StyleDictionary) => {
  /**
   * CSS Responsive Formatter
   * ------------------------------------------------------
   */
  sd.registerFormat({
    name: 'ds/css/variables-responsive',
    format: async ({ dictionary: rawDictionary, file, options }) => {
      const { outputReferences } = options
      const header = await fileHeader({ file })
      const dictionary = {
        ...rawDictionary,
        allTokens: expandResponsiveDimensionTokens(
          expandTypographyTokens(rawDictionary.allTokens, outputReferences ? 'css' : false),
          outputReferences ? 'css' : false,
        ),
      } as Dictionary

      // find reponsive tokens in dictionary which ends with -mobile, -tablet or -desktop
      const baseTokensOriginal = dictionary.allTokens.filter(token => token.name.endsWith('-mobile'))
      // create a deeop copy of base tokens
      const baseTokens = JSON.parse(JSON.stringify(baseTokensOriginal))
      const deviceBaseTokens = JSON.parse(JSON.stringify(baseTokensOriginal))

      //
      // Base tokens
      // ------------------------------------------------------

      // same as mobile but without the suffix
      baseTokens.forEach(token => {
        token.name = token.name.replace('-mobile', '')
      })

      const baseDictionary = {
        ...dictionary,
        allTokens: baseTokens,
      } as Dictionary

      //
      // Device tokens
      // ------------------------------------------------------

      // same as mobile but without the suffix
      deviceBaseTokens.forEach(token => {
        token.name = token.name.replace('-mobile', '-device')
      })
      const deviceBaseDictionary = {
        ...dictionary,
        allTokens: deviceBaseTokens,
      } as Dictionary

      const tabletTokensOriginal = dictionary.allTokens.filter(token => token.name.endsWith('-tablet'))
      const deviceTabletTokens = JSON.parse(JSON.stringify(tabletTokensOriginal))
      deviceTabletTokens.forEach(token => {
        token.name = token.name.replace('-tablet', '-device')
      })
      const deviceTabletDictionary = {
        ...dictionary,
        allTokens: deviceTabletTokens,
      } as Dictionary

      const desktopTokensOriginal = dictionary.allTokens.filter(token => token.name.endsWith('-desktop'))
      const deviceDesktopTokens = JSON.parse(JSON.stringify(desktopTokensOriginal))
      deviceDesktopTokens.forEach(token => {
        token.name = token.name.replace('-desktop', '-device')
      })
      const deviceDesktopDictionary = {
        ...dictionary,
        allTokens: deviceDesktopTokens,
      } as Dictionary

      // const mobileCss =
      //   ':root {\n' +
      //   formattedVariables({
      //     format: propertyFormatNames.css,
      //     dictionary,
      //     outputReferences,
      //     usesDtcg: true,
      //   }) +
      //   '\n\n' +
      //   '  /* Base tokens */\n' +
      //   formattedVariables({
      //     format: propertyFormatNames.css,
      //     dictionary: baseDictionary,
      //     outputReferences,
      //     usesDtcg: true,
      //   }) +
      //   '\n\n' +
      //   '  /* Device tokens */\n' +
      //   formattedVariables({
      //     format: propertyFormatNames.css,
      //     dictionary: deviceBaseDictionary,
      //     outputReferences,
      //     usesDtcg: true,
      //   }) +
      //   '\n}\n\n' +
      //   '/* Device tokens: Tablet */\n' +
      //   `\n@media (min-width: 769px) {\n` +
      //   formattedVariables({
      //     format: propertyFormatNames.css,
      //     dictionary: deviceTabletDictionary,
      //     outputReferences,
      //     usesDtcg: true,
      //   }) +
      //   `\n}\n\n` +
      //   '/* Device tokens: Desktop */\n' +
      //   `\n@media (min-width: 1024px) {\n` +
      //   formattedVariables({
      //     format: propertyFormatNames.css,
      //     dictionary: deviceDesktopDictionary,
      //     outputReferences,
      //     usesDtcg: true,
      //   }) +
      //   `\n}\n` +
      //   '\n'

      return (
        header +
        ':root, :host {\n' +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n\n' +
        '  /* Base tokens */\n' +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary: baseDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n\n' +
        '  /* Device tokens */\n' +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary: deviceBaseDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n}\n\n' +
        '/* Device tokens: Tablet */\n' +
        `\n@media (min-width: 769px) {\n` +
        ':root, :host {\n' +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary: deviceTabletDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        `\n}` +
        `\n}\n\n` +
        '/* Device tokens: Desktop */\n' +
        `\n@media (min-width: 1024px) {\n` +
        ':root, :host {\n' +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary: deviceDesktopDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        `\n}` +
        `\n}\n` +
        '\n'
      )
    },
  })

  /**
   * CSS Brand Formatter
   * ------------------------------------------------------
   */
  sd.registerFormat({
    name: 'ds/css/variables-brand',
    format: async ({ dictionary: rawDictionary, file, options }) => {
      const { outputReferences } = options
      const selector = (options.selector as string) ?? '[data-theme="brand"]'
      const header = await fileHeader({ file })
      const dictionary = {
        ...rawDictionary,
        allTokens: expandResponsiveDimensionTokens(
          expandTypographyTokens(rawDictionary.allTokens, outputReferences ? 'css' : false),
          outputReferences ? 'css' : false,
        ),
      } as Dictionary

      // Only emit tokens that come from the brand source file, not from include (base)
      const sourceTokens = dictionary.allTokens.filter(token => token.isSource)
      const sourceDictionary = { ...dictionary, allTokens: sourceTokens } as Dictionary

      const baseTokensOriginal = sourceTokens.filter(token => token.name.endsWith('-mobile'))
      const baseTokens = JSON.parse(JSON.stringify(baseTokensOriginal))
      const deviceBaseTokens = JSON.parse(JSON.stringify(baseTokensOriginal))

      baseTokens.forEach(token => {
        token.name = token.name.replace('-mobile', '')
      })
      deviceBaseTokens.forEach(token => {
        token.name = token.name.replace('-mobile', '-device')
      })

      const baseDictionary = { ...dictionary, allTokens: baseTokens } as Dictionary
      const deviceBaseDictionary = { ...dictionary, allTokens: deviceBaseTokens } as Dictionary

      const tabletTokensOriginal = sourceTokens.filter(token => token.name.endsWith('-tablet'))
      const deviceTabletTokens = JSON.parse(JSON.stringify(tabletTokensOriginal))
      deviceTabletTokens.forEach(token => {
        token.name = token.name.replace('-tablet', '-device')
      })
      const deviceTabletDictionary = { ...dictionary, allTokens: deviceTabletTokens } as Dictionary

      const desktopTokensOriginal = sourceTokens.filter(token => token.name.endsWith('-desktop'))
      const deviceDesktopTokens = JSON.parse(JSON.stringify(desktopTokensOriginal))
      deviceDesktopTokens.forEach(token => {
        token.name = token.name.replace('-desktop', '-device')
      })
      const deviceDesktopDictionary = { ...dictionary, allTokens: deviceDesktopTokens } as Dictionary

      return (
        header +
        `${selector} {\n` +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary: sourceDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n\n  /* Base tokens */\n' +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary: baseDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n\n  /* Device tokens */\n' +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary: deviceBaseDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n}\n\n' +
        '/* Device tokens: Tablet */\n' +
        `\n@media (min-width: 769px) {\n` +
        `${selector} {\n` +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary: deviceTabletDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        `\n}` +
        `\n}\n\n` +
        '/* Device tokens: Desktop */\n' +
        `\n@media (min-width: 1024px) {\n` +
        `${selector} {\n` +
        formattedVariablesByOrigin({
          format: propertyFormatNames.css,
          dictionary: deviceDesktopDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        `\n}` +
        `\n}\n` +
        '\n'
      )
    },
  })

  /**
   * SCSS Variables Formatter
   * ------------------------------------------------------
   * A thin wrapper around Style Dictionary's own stock 'scss/variables' format (reproduced here,
   * not imported — SD doesn't expose the stock format bodies for reuse), needed only because the
   * stock format has no hook to run expandTypographyTokens first. Every other type's scss output
   * is unaffected — the expand pass is a no-op for any token that isn't $type: "typography".
   */
  sd.registerFormat({
    name: 'ds/scss/variables',
    format: async ({ dictionary: rawDictionary, options, file }) => {
      const { outputReferences, themeable = false, formatting, sort } = options
      const dictionary = {
        ...rawDictionary,
        allTokens: expandResponsiveDimensionTokens(
          expandTypographyTokens(rawDictionary.allTokens, outputReferences ? 'sass' : false),
          outputReferences ? 'sass' : false,
        ),
      } as Dictionary
      const header = await fileHeader({ file, options })
      return (
        header +
        formattedVariablesByOrigin({
          format: propertyFormatNames.sass,
          dictionary,
          outputReferences,
          themeable,
          formatting,
          usesDtcg: true,
          sort,
          indent: '',
        }) +
        '\n'
      )
    },
  })

  /**
   * JSON Flat Formatter
   * ------------------------------------------------------
   * A thin wrapper around Style Dictionary's own stock 'json/flat' format (reproduced here, not
   * imported — SD doesn't expose the stock format bodies for reuse), needed only so a responsive
   * dimension token's mobile/tablet/desktop breakpoints — otherwise invisible past its
   * mobile-mirrored `$value` (decision 4) — still reach this flat platform, mirroring the
   * `-mobile`/`-tablet`/`-desktop` expansion the CSS/SCSS formatters above already do.
   */
  sd.registerFormat({
    name: 'ds/json/flat',
    format: async ({ dictionary: rawDictionary, options }) => {
      const dictionary = {
        ...rawDictionary,
        allTokens: expandResponsiveDimensionTokens(rawDictionary.allTokens, false),
      } as Dictionary
      return (
        '{\n' +
        dictionary.allTokens
          .map(token => `  "${token.name}": ${JSON.stringify(options.usesDtcg ? token.$value : token.value)}`)
          .join(',\n') +
        '\n}\n'
      )
    },
  })

  /**
   * JavaScript ES6 Formatter
   * ------------------------------------------------------
   * Same rationale as 'ds/json/flat' above, for the 'javascript/es6' stock format. Unlike the
   * kebab-case names 'ds/json/flat' (and the CSS/SCSS formatters above) see, this platform's
   * `ds/js/name` transform has already produced PascalCase identifiers (e.g.
   * `DsAliasContainerSpace`) by the time this formatter runs — expandResponsiveDimensionTokens's
   * `-mobile`/`-tablet`/`-desktop` suffix would otherwise land as an invalid `Name-mobile`
   * identifier, so it's re-cased to `NameMobile` here before emitting.
   */
  sd.registerFormat({
    name: 'ds/javascript/es6',
    format: async ({ dictionary: rawDictionary, file, options }) => {
      const header = await fileHeader({ file, options })
      const dictionary = {
        ...rawDictionary,
        allTokens: expandResponsiveDimensionTokens(rawDictionary.allTokens, false).map(token => {
          const match = /^(.+)-(mobile|tablet|desktop)$/.exec(token.name)
          if (!match) return token
          const [, base, breakpoint] = match
          return { ...token, name: `${base}${breakpoint[0].toUpperCase()}${breakpoint.slice(1)}` }
        }),
      } as Dictionary
      const body = dictionary.allTokens
        .map(token => `export const ${token.name} = ${JSON.stringify(options.usesDtcg ? token.$value : token.value)};`)
        .join('\n')
      return `${header}${body}\n`
    },
  })
}
