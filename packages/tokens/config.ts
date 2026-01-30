import StyleDictionary, { Config } from 'style-dictionary'

const basePxFontSize = 16

const config: Config = {
  // source: ['tokens/**/*.json', '../../packages/core/src/components/**/*.vars.json'],
  source: [`tokens/base.tokens.json`],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['bal/size/rem', 'bal/color/rgba', 'bal/css/name'],
      basePxFontSize,
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
        // {
        //   destination: '../../core/www/assets/tokens.css',
        //   format: 'css/variables',
        //   filter: token => !token.filePath.includes('deprecated.json'),
        // },
        // {
        //   destination: 'tokens.deprecated.css',
        //   format: 'css/variables',
        //   filter: token => token.filePath.includes('deprecated.json'),
        //   options: {
        //     outputReferences: false,
        //   },
        // },
        // {
        //   format: 'json',
        //   destination: 'tokens.docs.json',
        //   options: {
        //     outputReferences: true,
        //   },
        //   filter: token => !token.filePath.includes('deprecated.json'),
        // },
      ],
      options: {
        outputReferences: true,
      },
    },
    // 'scss': {
    //   transformGroup: 'scss',
    //   transforms: ['size/pxToRem', 'bal/color/rgba', 'bal/css/name'],
    //   basePxFontSize: 16,
    //   buildPath: 'dist/',
    //   prefix: 'bal',
    //   files: [
    //     {
    //       format: 'scss/variables',
    //       destination: 'tokens.scss',
    //       options: {
    //         outputReferences: true,
    //       },
    //     },
    //   ],
    // },
    // 'js': {
    //   transformGroup: 'js',
    //   transforms: ['size/pxToRem', 'bal/color/rgba', 'name/camel', 'bal/css/name'],
    //   buildPath: 'dist/',
    //   prefix: 'bal',
    //   files: [
    //     {
    //       format: 'javascript/es6',
    //       destination: 'tokens.js',
    //     },
    //     {
    //       format: 'typescript/es6-declarations',
    //       destination: 'tokens.d.ts',
    //     },
    //     {
    //       format: 'json/flat',
    //       destination: 'tokens.json',
    //     },
    //   ],
    // },
    // 'android': {
    //   transformGroup: 'android',
    //   buildPath: 'dist/android/',
    //   prefix: 'bal',
    //   files: [
    //     {
    //       destination: 'font_dimens.xml',
    //       format: 'android/fontDimens',
    //     },
    //     {
    //       destination: 'colors.xml',
    //       format: 'android/colors',
    //     },
    //   ],
    // },
    // 'compose': {
    //   transformGroup: 'compose',
    //   buildPath: 'dist/compose/',
    //   prefix: 'bal',
    //   files: [
    //     {
    //       destination: 'StyleDictionaryColor.kt',
    //       format: 'compose/object',
    //       options: {
    //         className: 'StyleDictionaryColor',
    //         packageName: 'StyleDictionaryColor',
    //       },
    //       filter: {
    //         $type: 'color',
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionarySize.kt',
    //       format: 'compose/object',
    //       options: {
    //         className: 'StyleDictionarySize',
    //         packageName: 'StyleDictionarySize',
    //         type: 'float',
    //       },
    //       filter: {
    //         $type: 'dimension',
    //       },
    //     },
    //   ],
    // },
    // 'ios': {
    //   transformGroup: 'ios',
    //   buildPath: 'dist/ios/',
    //   prefix: 'bal',
    //   files: [
    //     {
    //       destination: 'StyleDictionaryColor.h',
    //       format: 'ios/colors.h',
    //       options: {
    //         className: 'StyleDictionaryColor',
    //         type: 'StyleDictionaryColorName',
    //       },
    //       filter: {
    //         $type: 'color',
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionaryColor.m',
    //       format: 'ios/colors.m',
    //       options: {
    //         className: 'StyleDictionaryColor',
    //         type: 'StyleDictionaryColorName',
    //       },
    //       filter: {
    //         $type: 'color',
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionarySize.h',
    //       format: 'ios/static.h',
    //       options: {
    //         className: 'StyleDictionarySize',
    //         type: 'float',
    //       },
    //       filter: {
    //         $type: 'dimension',
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionarySize.m',
    //       format: 'ios/static.m',
    //       options: {
    //         className: 'StyleDictionarySize',
    //         type: 'float',
    //       },
    //       filter: {
    //         $type: 'dimension',
    //       },
    //     },
    //   ],
    // },
    // 'ios-swift': {
    //   transformGroup: 'ios-swift',
    //   prefix: 'bal',
    //   buildPath: 'dist/ios-swift/',
    //   files: [
    //     {
    //       destination: 'StyleDictionary+Class.swift',
    //       format: 'ios-swift/class.swift',
    //       options: {
    //         className: 'StyleDictionaryClass',
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionary+Enum.swift',
    //       format: 'ios-swift/enum.swift',
    //       options: {
    //         className: 'StyleDictionaryEnum',
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionary+Struct.swift',
    //       format: 'ios-swift/any.swift',
    //       options: {
    //         className: 'StyleDictionaryStruct',
    //         imports: 'SwiftUI',
    //         objectType: 'struct',
    //         accessControl: 'internal',
    //       },
    //     },
    //   ],
    // },
    // 'ios-swift-separate-enums': {
    //   transformGroup: 'ios-swift-separate',
    //   prefix: 'bal',
    //   buildPath: 'dist/ios-swift/',
    //   files: [
    //     {
    //       destination: 'StyleDictionaryColor.swift',
    //       format: 'ios-swift/enum.swift',
    //       options: {
    //         className: 'StyleDictionaryColor',
    //       },
    //       filter: {
    //         $type: 'color',
    //       },
    //     },
    //     {
    //       destination: 'StyleDictionarySize.swift',
    //       format: 'ios-swift/enum.swift',
    //       options: {
    //         className: 'StyleDictionarySize',
    //       },
    //       filter: {
    //         $type: 'dimension',
    //       },
    //     },
    //   ],
    // },
  },
}

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `bal/color/rgba`,
  filter: token => token.$type === 'color',
  transform: (token, _options) => {
    const value = token.$value ?? token.value
    // Handle object values with hex and alpha properties
    if (typeof value === 'object' && value !== null && 'hex' in value && 'alpha' in value) {
      const hex = value.hex.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      const a = parseFloat(value.alpha)
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }
    return value
  },
})

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `bal/size/rem`,
  filter: token => token.$type === 'number',
  transform: (token, _options) => {
    const value = token.$value ?? token.value

    const tokenName = Array.isArray((token as any).name)
      ? (token as any).name.join('-')
      : String((token as any).name ?? '')

    // if line-height round the value to 1 decimal place
    if (tokenName.includes('line-height')) {
      return Math.round(value * 10) / 10
    }

    // ignore specific tokens
    const ignore = ['line-height', 'breakpoint', 'radius-rounded', 'z-index', 'opacity', 'container', 'font-weight']
    if (ignore.some(ignored => tokenName.includes(ignored))) {
      return value
    }

    return value / basePxFontSize + 'rem'
  },
})

StyleDictionary.registerTransform({
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

    return tokenName
  },
})

export default config
