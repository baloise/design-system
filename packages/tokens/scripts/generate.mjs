import setWith from 'lodash.setwith'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
import StyleDictionaryCore from 'style-dictionary'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// EXTEND CONFIG
const StyleDictionary = StyleDictionaryCore.extend(path.join(__dirname, '../config.js'))

// const { minifyDictionary } = StyleDictionary.formatHelpers

// const formatter = ({ dictionary }) => {
//   return JSON.stringify(minifyDictionary(dictionary.tokens), null, 2)
// }

// // Avoid nested collision warnings
// formatter.nested = true

// styleDictionary.registerFormat({
//   name: 'custom/json/nested',
//   formatter: formatter,
// })

// REGISTER THE CUSTOM FILTERS
StyleDictionary.registerTransform({
  type: `name`,
  transitive: true,
  name: `bal/css/name`,
  transformer: (token, options) => {
    const isFigma = options.transformGroup === 'web'
    const isKebabCase = token.name.indexOf('-') > 0
    const isSizeVariable = token.attributes.category === 'size'
    const isColorVariable = token.attributes.category === 'color'
    const endsWithMobile = token.name.endsWith('-mobile') || token.name.endsWith('Mobile')
    const endsWithDefault = token.name.endsWith('-default') || token.name.endsWith('Default')

    let tokenName = token.name

    if (isKebabCase) {
      if (isSizeVariable) {
        tokenName = tokenName.replace('bal-size', 'bal')
      }
      if (isColorVariable) {
        tokenName = tokenName.replace('bal-color-base', 'bal-color')
        tokenName = tokenName.replace('bal-color-alias', 'bal-color')
      }
      if (endsWithMobile) {
        tokenName = tokenName.replace('-mobile', '')
      }
      if (endsWithDefault && !isFigma) {
        tokenName = tokenName.replace('-default', '')
      }
    } else {
      if (isSizeVariable) {
        tokenName = tokenName.replace('balSize', 'bal').replace('BalSize', 'Bal')
      }
      if (isColorVariable) {
        tokenName = tokenName.replace('balColorBase', 'balColor').replace('BalColorBase', 'BalColor')
        tokenName = tokenName.replace('balColorAlias', 'balColor').replace('BalColorAlias', 'BalColor')
      }
      if (endsWithMobile) {
        tokenName = tokenName.replace('Mobile', '')
      }
      if (endsWithDefault && !isFigma) {
        tokenName = tokenName.replace('Default', '')
      }
    }

    return tokenName
  },
})

StyleDictionary.registerFilter({
  name: `bal/figma/color`,
  matcher: token => {
    return token.deprecated !== true && token.attributes.category === 'color'
  },
})

StyleDictionary.registerFilter({
  name: `bal/figma/size`,
  matcher: token => {
    return token.deprecated !== true && token.attributes.category === 'size'
  },
})

StyleDictionary.registerFilter({
  name: `bal/without-deprecated`,
  matcher: token => {
    return token.deprecated !== true
  },
})

StyleDictionary.registerFilter({
  name: `bal/only-deprecated`,
  matcher: token => {
    return token.deprecated === true
  },
})

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `bal/size/rem`,
  matcher: token => {
    return /px$|%$/.test(token.original.value) || token.keepFormat
  },
  transformer: token => {
    return token.original.value
  },
})

const FigmaFormatter = ({ dictionary, _platform, _options, _file }) => {
  const tokens = {}

  const formatValue = value => {
    if (value.startsWith('{')) {
      const path = value.substring(1, value.length - 1)
      return `{${path
        .split('.')
        .map((p, i) => (i === 0 ? p : upperFirst(camelCase(p))))
        .join('.')}}`
    }
    return value
  }

  dictionary.allTokens.map(token => {
    let value = token.value

    let hasPixelOrPercentage = /px$|%$/.test(token.original.value)
    let isAlias = token.original.value.startsWith('{')
    let keepFormat = token.keepFormat
    let noFigmaImport = token.noFigmaImport

    if (noFigmaImport !== true) {
      if (hasPixelOrPercentage || keepFormat) {
        value = token.original.value
      } else if (isAlias) {
        value = formatValue(token.original.value)
      }

      setWith(
        tokens,
        token.path.map((p, i) => (i === 0 ? p : upperFirst(camelCase(p)))),
        { value, group: token.attributes.category },
        Object,
      )
    }
  })

  return JSON.stringify(tokens, null, 2)
}

FigmaFormatter.nested = true

StyleDictionary.registerFormat({
  name: 'bal/figma',
  formatter: FigmaFormatter,
})

// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionary.buildAllPlatforms()
