import { CustomTransformsBuilder, ExtensionContext } from '@nxkit/style-dictionary/extensions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customTransformsBuilder: CustomTransformsBuilder = (extensionContext: ExtensionContext) => {
  return {
    'bal/size/rem': {
      type: 'value',
      matcher: function (token) {
        return /px$|%$/.test(token.original.value) || token.keepFormat
      },
      transformer: function (token) {
        return token.original.value
      },
    },
    'bal/css/name': {
      type: 'name',
      transitive: true,
      transformer: function (token, options) {
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
    },
  }
}

export default customTransformsBuilder
