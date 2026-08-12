import StyleDictionary from 'style-dictionary'

import { colorValueToCss, numberValueToCssSize, roundNumberValue } from './css-value.js'
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
}
