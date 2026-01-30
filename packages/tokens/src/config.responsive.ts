import { Config } from 'style-dictionary'

const basePxFontSize = 16

const config: Config = {
  source: [
    'tokens/responsive/Mobile.tokens.json',
    // This file will be included via the custom formatter, so we will
    // not have any conflicts with the other platforms.
    // 'tokens/responsive/Tablet.tokens.json',
    // 'tokens/responsive/Desktop.tokens.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['bal/size/rem', 'bal/css/name'],
      basePxFontSize,
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          destination: `css/responsive.tokens.css`,
          format: 'bal/css/variables-responsive',
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    web: {
      transformGroup: 'web',
      transforms: ['bal/size/rem', 'bal/color/hex', 'bal/css/name'],
      prefix: 'bal',
      buildPath: 'dist/',
      files: [
        {
          format: 'bal/json/variables-responsive',
          destination: `web/responsive.tokens.json`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    javascript: {
      transformGroup: 'js',
      transforms: ['bal/size/round', 'bal/color/hex', 'bal/js/name'],
      prefix: 'bal',
      buildPath: 'dist/',
      files: [
        {
          format: 'bal/javascript/variables-responsive',
          destination: `js/responsive.tokens.js`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
  },
}

export default config
