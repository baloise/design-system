import StyleDictionary from 'style-dictionary'

export const registerCustomTransformers = (sd: typeof StyleDictionary) => {
  /**
   * Transform color tokens with hex and alpha properties to rgba() format
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `bal/color/rgba`,
    filter: token => token.$type === 'color',
    transform: (token, _options) => {
      const value = token.$value ?? token.value
      // Handle object values with hex and alpha properties
      if (typeof value === 'object' && value !== null && 'hex' in value && 'alpha' in value && value.alpha < 1) {
        const hex = value.hex.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        const a = parseFloat(value.alpha)
        return `rgba(${r}, ${g}, ${b}, ${a})`
      }
      if (value.hex) {
        return value.hex
      }
      return value
    },
  })

  /**
   * Transform color tokens with hex
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `bal/color/hex`,
    filter: token => token.$type === 'color',
    transform: (token, _options) => {
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
    name: `bal/css/name`,
    transform: (token, _options) => {
      let tokenName = token.name
      const isPrimitive = token.path.includes('🧱 Primitive')
      if (isPrimitive) {
        tokenName = tokenName.replace('-primitive', '')
      }

      const isSemantic = token.path.includes('🏷️ Semantic')
      if (isSemantic) {
        tokenName = tokenName.replace('-semantic', '')
      }

      const isComponent = token.path.includes('🧩 Component')
      if (isComponent) {
        tokenName = tokenName.replace('-component', '')
      }

      // we use t-shirt sizes and need to make sure that 2xl becomes 2xl and not 2-xl
      // check if token names has number followed by xl or xs and replace it with numberxl without dash
      if (/-?([0-9]+)-(xl|xs)/.test(tokenName)) {
        tokenName = tokenName.replace(/-?([0-9]+)-(xl|xs)/, '-$1$2')
      }

      // check that no name has double dash and replace it with single dash
      if (tokenName.includes('--')) {
        tokenName = tokenName.replace(/--+/g, '-')
      }

      return tokenName
    },
  })

  /**
   * Transform token names for CSS usage
   */
  sd.registerTransform({
    type: `name`,
    transitive: true,
    name: `bal/js/name`,
    transform: (token, _options) => {
      let tokenName = token.name
      tokenName = tokenName.replace('Primitive', '')
      tokenName = tokenName.replace('Semantic', '')

      return tokenName
    },
  })

  /**
   * Transform size tokens from px to rem
   */
  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `bal/size/rem`,
    filter: token => token.$type === 'number',
    transform: (token, _options) => {
      const name = token.name
      const value = token.$value
      const originalValue = token.original.$value
      const path = token.path
      const isReference =
        typeof originalValue === 'string' && originalValue.startsWith('{') && originalValue.endsWith('}')

      if (`${value}`.endsWith('px')) {
        return value
      }

      if (`${value}`.endsWith('rem')) {
        return value
      }

      // Number only values with no unit
      const tokenToBeNumberOnly = [
        'LineHeight',
        'FontWeight',
        'Opacity',
        '🌫️ Opacity',
        'Z-Index',
        '🗂️ Z-Index',
        'Interaction',
        '✨ Interaction',
      ]
      if (tokenToBeNumberOnly.some(ignored => path.includes(ignored))) {
        return Math.round(value * 10) / 10
      }

      // Number only values with no unit
      const tokenToBeNumberPixel = ['📐 Breakpoint', 'Breakpoint', '🗃️ Container', 'Container']
      if (tokenToBeNumberPixel.some(ignored => path.includes(ignored))) {
        return value + 'px'
      }

      // Extra case for rounded radius
      if (value === 9999) {
        return value + 'px'
      }

      // turn pixel into rem
      return value / 16 + 'rem'
    },
  })

  sd.registerTransform({
    type: `value`,
    transitive: true,
    name: `bal/size/round`,
    filter: token => token.$type === 'number',
    transform: (token, _options) => {
      const value = token.$value ?? token.value

      const tokenName = Array.isArray((token as any).name)
        ? (token as any).name.join('-')
        : String((token as any).name ?? '')

      // if line-height round the value to 1 decimal place
      if (
        tokenName.includes('line-height') ||
        tokenName.includes('opacity') ||
        tokenName.includes('LineHeight') ||
        tokenName.includes('Opacity')
      ) {
        return Math.round(value * 10) / 10
      }

      return value
    },
  })
}
