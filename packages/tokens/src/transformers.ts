import StyleDictionary from 'style-dictionary'

import {
  borderValueToCss,
  colorValueToCss,
  dimensionValueToCss,
  fontFamilyValueToCss,
  numberValueToCssSize,
  roundNumberValue,
  shadowValueToCss,
  typographyValueToCss,
} from './css-value.js'
import { tokenNameToCssVar } from './css-naming.js'

export const registerCustomTransformers = (sd: typeof StyleDictionary) => {
  /**
   * Transform color tokens with hex and alpha properties to rgba() format
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/color/rgba`,
    filter: token => token.$type === 'color',
    transform: token => {
      const value = token.$value ?? token.value
      return colorValueToCss(value) ?? value
    },
  })

  /**
   * Transform color tokens with hex
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/color/hex`,
    filter: token => token.$type === 'color',
    transform: token => {
      const value = token.$value ?? token.value
      // Handle object values with hex and alpha properties
      if (typeof value === 'object' && value !== null && 'hex' in value && 'alpha' in value) {
        return value.hex
      }
      return value
    },
  })

  /**
   * Transform token names for CSS usage
   */
  sd.registerTransform({
    type: `name`,
    transitive: true,
    name: `ds/css/name`,
    transform: (token, config) => tokenNameToCssVar(token.path, config.prefix ?? 'ds'),
  })

  /**
   * Transform token names for CSS usage
   */
  sd.registerTransform({
    type: `name`,
    transitive: true,
    name: `ds/js/name`,
    transform: token => {
      let tokenName = token.name
      tokenName = tokenName.replace('Primitive', 'Global')
      tokenName = tokenName.replace('Semantic', 'Alias')

      return tokenName
    },
  })

  /**
   * Transform size tokens from px to rem
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/size/rem`,
    filter: token => token.$type === 'number',
    transform: token => numberValueToCssSize(token.$value, token.path),
  })

  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/size/round`,
    filter: token => token.$type === 'number',
    transform: token => {
      const value = token.$value ?? token.value
      const name = token.name
      const tokenName = Array.isArray(name) ? name.join('-') : String(name ?? '')
      return roundNumberValue(value, tokenName)
    },
  })

  /**
   * Transform fontWeight tokens to a bare CSS number (e.g. 700), never rem/px-converted
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/font-weight`,
    filter: token => token.$type === 'fontWeight',
    transform: token => Number(token.$value ?? token.value),
  })

  /**
   * Transform fontFamily tokens (an array of font names) into a CSS-ready, comma-joined
   * font-family declaration, quoting only entries that need it.
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/font-family`,
    filter: token => token.$type === 'fontFamily',
    transform: token => fontFamilyValueToCss(token.$value ?? token.value),
  })

  /**
   * Transform dimension tokens ({value, unit}) into a CSS-ready size, e.g. '1.5rem'.
   *
   * NOT needed on the 'css'/'scss'/'javascript' platforms — their transformGroups already include
   * Style Dictionary's own built-in 'size/rem', which correctly preserves whichever unit our
   * $value carries; adding this transform there too would double-process it (the same trap
   * 'ds/font-family' hit — see docs/plans/font-family-token-type-plan.md's addendum).
   *
   * IS needed on 'web'/'docs' (config.base.ts) and the brand css platform (config.brand.ts) —
   * 'web'/'docs' use the 'web' transformGroup, which includes Style Dictionary's built-in
   * 'size/px' instead of 'size/rem'; unlike 'size/rem', 'size/px' unconditionally forces a "px"
   * suffix onto the number *without* converting it (a 1.5rem token would come out "1.5px" — wrong
   * unit label AND physically 24x smaller than intended). Re-registering a transform under the
   * name 'size/px' to override that behavior was tried and didn't take effect — Style Dictionary
   * appears to re-establish its own built-ins on instance construction, after this module's
   * static-level registration — so 'web'/'docs' drop `transformGroup: 'web'` entirely instead and
   * list their transforms explicitly (see config.base.ts), which is why this transform has to be
   * in that explicit list. The brand css platform has no transformGroup at all, so it always
   * needed this explicitly regardless.
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/dimension`,
    filter: token => token.$type === 'dimension',
    transform: token => {
      const value = token.$value ?? token.value
      // Already a string when 'size/rem' ran first (needed on 'web'/'docs' so a border
      // composite token's referenced Width sub-value resolves correctly — see 'web'/'docs'
      // platform comment in config.base.ts). Pass through rather than re-parse.
      return typeof value === 'string' ? value : dimensionValueToCss(value)
    },
  })

  /**
   * Transform shadow tokens (a shadow object, or an array of them) into a CSS-ready box-shadow
   * value. Not relying on Style Dictionary's own built-in 'shadow/css/shorthand' — verified its
   * color output ('rgb(0% 0% 0% / 0.25)', colorjs.io's default) doesn't match this codebase's
   * '#hex'/'rgba(...)' convention. See docs/plans/shadow-token-type-plan.md.
   */
  /**
   * Transform dimension tokens for JS consumption: px stays a bare number (e.g. 769, not "769px")
   * so it's directly usable in JS logic (media-query math, comparisons); rem stays a string, since
   * it's only meaningful as a CSS value. Runs after the 'js' transformGroup's built-in 'size/rem',
   * which has already turned the {value, unit} object into a "769px"/"1rem" string.
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/dimension/js`,
    filter: token => token.$type === 'dimension',
    transform: token => {
      const value = token.$value ?? token.value
      if (typeof value === 'string' && value.endsWith('px')) {
        return Number(value.slice(0, -2))
      }
      return value
    },
  })

  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/shadow`,
    filter: token => token.$type === 'shadow',
    transform: token => shadowValueToCss(token.$value ?? token.value),
  })

  /**
   * Transform border tokens ({color, width, style}) into a CSS-ready border shorthand value. Not
   * relying on Style Dictionary's own built-in 'border/css/shorthand' — verified it renders each
   * sub-value as a `var(--ds-*)` reference to its sibling custom property instead of a resolved
   * literal, diverging from this codebase's convention. See docs/plans/border-token-type-plan.md.
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/border`,
    filter: token => token.$type === 'border',
    transform: token => borderValueToCss(token.$value ?? token.value),
  })

  /**
   * Transform typography tokens ({fontFamily, fontSize, fontWeight, lineHeight}) into their 4
   * CSS-ready sub-strings. Unlike every transform above, this doesn't produce the token's final
   * `.value` directly usable by Style Dictionary's stock `css`/`variables` formatter — a typography
   * token maps to 4 separate custom properties, not 1 (docs/plans/typography-token-type-plan.md
   * decision 5). The `ds/css/variables-*` formatters (`formatter.ts`) expand each
   * `$type: "typography"` token's `{fontFamily, fontSize, fontWeight, lineHeight}` value (the
   * object this transform produces) into 4 token entries before handing off to
   * `formattedVariables` — this transform's only job is getting each sub-value from "maybe still a
   * reference / raw DTCG shape" to "final CSS string" first, same as ds/shadow/ds/border.
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/typography`,
    filter: token => token.$type === 'typography',
    transform: token => typographyValueToCss(token.$value ?? token.value),
  })
}
