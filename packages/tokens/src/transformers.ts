import StyleDictionary from 'style-dictionary'

import {
  colorValueToCss,
  dimensionValueToCss,
  fontFamilyValueToCss,
  numberValueToCssSize,
  roundNumberValue,
  shadowValueToCss,
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
    transform: token => dimensionValueToCss(token.$value ?? token.value),
  })

  /**
   * Transform shadow tokens (a shadow object, or an array of them) into a CSS-ready box-shadow
   * value. Not relying on Style Dictionary's own built-in 'shadow/css/shorthand' — verified its
   * color output ('rgb(0% 0% 0% / 0.25)', colorjs.io's default) doesn't match this codebase's
   * '#hex'/'rgba(...)' convention. See docs/plans/shadow-token-type-plan.md.
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `ds/shadow`,
    filter: token => token.$type === 'shadow',
    transform: token => shadowValueToCss(token.$value ?? token.value),
  })
}
