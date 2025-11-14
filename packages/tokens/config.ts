import StyleDictionary, { Config } from 'style-dictionary'

const config: Config = {
  source: ['tokens/**/*.json'],
  platforms: {
    'css': {
      transformGroup: 'css',
      transforms: ['size/pxToRem', 'bal/css/name'],
      basePxFontSize: 16,
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
        {
          format: 'json',
          destination: 'tokens.docs.json',
          options: {
            outputReferences: true,
          },
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    'scss': {
      transformGroup: 'scss',
      transforms: ['size/pxToRem', 'bal/css/name'],
      basePxFontSize: 16,
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          format: 'scss/variables',
          destination: 'tokens.scss',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    'js': {
      transformGroup: 'js',
      transforms: ['size/pxToRem', 'name/camel', 'bal/css/name'],
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          format: 'javascript/es6',
          destination: 'tokens.js',
        },
        {
          format: 'typescript/es6-declarations',
          destination: 'tokens.d.ts',
        },
        {
          format: 'json/flat',
          destination: 'tokens.json',
        },
      ],
    },
    'android': {
      transformGroup: 'android',
      buildPath: 'dist/android/',
      prefix: 'bal',
      files: [
        {
          destination: 'font_dimens.xml',
          format: 'android/fontDimens',
        },
        {
          destination: 'colors.xml',
          format: 'android/colors',
        },
      ],
    },
    'compose': {
      transformGroup: 'compose',
      buildPath: 'dist/compose/',
      prefix: 'bal',
      files: [
        {
          destination: 'StyleDictionaryColor.kt',
          format: 'compose/object',
          options: {
            className: 'StyleDictionaryColor',
            packageName: 'StyleDictionaryColor',
          },
          filter: {
            $type: 'color',
          },
        },
        {
          destination: 'StyleDictionarySize.kt',
          format: 'compose/object',
          options: {
            className: 'StyleDictionarySize',
            packageName: 'StyleDictionarySize',
            type: 'float',
          },
          filter: {
            $type: 'dimension',
          },
        },
      ],
    },
    'ios': {
      transformGroup: 'ios',
      buildPath: 'dist/ios/',
      prefix: 'bal',
      files: [
        {
          destination: 'StyleDictionaryColor.h',
          format: 'ios/colors.h',
          options: {
            className: 'StyleDictionaryColor',
            type: 'StyleDictionaryColorName',
          },
          filter: {
            $type: 'color',
          },
        },
        {
          destination: 'StyleDictionaryColor.m',
          format: 'ios/colors.m',
          options: {
            className: 'StyleDictionaryColor',
            type: 'StyleDictionaryColorName',
          },
          filter: {
            $type: 'color',
          },
        },
        {
          destination: 'StyleDictionarySize.h',
          format: 'ios/static.h',
          options: {
            className: 'StyleDictionarySize',
            type: 'float',
          },
          filter: {
            $type: 'dimension',
          },
        },
        {
          destination: 'StyleDictionarySize.m',
          format: 'ios/static.m',
          options: {
            className: 'StyleDictionarySize',
            type: 'float',
          },
          filter: {
            $type: 'dimension',
          },
        },
      ],
    },
    'ios-swift': {
      transformGroup: 'ios-swift',
      prefix: 'bal',
      buildPath: 'dist/ios-swift/',
      files: [
        {
          destination: 'StyleDictionary+Class.swift',
          format: 'ios-swift/class.swift',
          options: {
            className: 'StyleDictionaryClass',
          },
        },
        {
          destination: 'StyleDictionary+Enum.swift',
          format: 'ios-swift/enum.swift',
          options: {
            className: 'StyleDictionaryEnum',
          },
        },
        {
          destination: 'StyleDictionary+Struct.swift',
          format: 'ios-swift/any.swift',
          options: {
            className: 'StyleDictionaryStruct',
            imports: 'SwiftUI',
            objectType: 'struct',
            accessControl: 'internal',
          },
        },
      ],
    },
    'ios-swift-separate-enums': {
      transformGroup: 'ios-swift-separate',
      prefix: 'bal',
      buildPath: 'dist/ios-swift/',
      files: [
        {
          destination: 'StyleDictionaryColor.swift',
          format: 'ios-swift/enum.swift',
          options: {
            className: 'StyleDictionaryColor',
          },
          filter: {
            $type: 'color',
          },
        },
        {
          destination: 'StyleDictionarySize.swift',
          format: 'ios-swift/enum.swift',
          options: {
            className: 'StyleDictionarySize',
          },
          filter: {
            $type: 'dimension',
          },
        },
      ],
    },
  },
}

StyleDictionary.registerTransform({
  type: `name`,
  transitive: true,
  name: `bal/css/name`,
  transform: (token, options) => {
    const isKebabCase = token.name.indexOf('-') > 0
    const isColorVariable = token.attributes.category === 'color'
    const endsWithMobile = token.name.endsWith('-mobile') || token.name.endsWith('Mobile')
    const endsWithDefault = token.name.endsWith('-default') || token.name.endsWith('Default')

    let tokenName = token.name

    if (isKebabCase) {
      if (isColorVariable) {
        tokenName = tokenName.replace('bal-color-base', 'bal-color')
        tokenName = tokenName.replace('bal-color-alias', 'bal-color')
      }
      if (endsWithMobile) {
        tokenName = tokenName.replace('-mobile', '')
      }
      if (endsWithDefault) {
        tokenName = tokenName.replace('-default', '')
      }
    } else {
      if (isColorVariable) {
        tokenName = tokenName.replace('balColorBase', 'balColor').replace('BalColorBase', 'BalColor')
        tokenName = tokenName.replace('balColorAlias', 'balColor').replace('BalColorAlias', 'BalColor')
      }
      if (endsWithMobile) {
        tokenName = tokenName.replace('Mobile', '')
      }
      if (endsWithDefault) {
        tokenName = tokenName.replace('Default', '')
      }
    }

    return tokenName
  },
})

export default config
