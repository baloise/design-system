import { Config } from 'style-dictionary'

const basePxFontSize = 16
const mode = 'Base'

const config: Config = {
  source: [`tokens/${mode}.tokens.json`],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['bal/size/rem', 'bal/color/rgba', 'bal/css/name'],
      basePxFontSize,
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          format: 'bal/css/variables-responsive',
          destination: `css/${mode.toLowerCase()}.tokens.css`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    scss: {
      transformGroup: 'scss',
      transforms: ['bal/size/rem', 'bal/color/rgba', 'bal/css/name'],
      basePxFontSize,
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          format: 'scss/variables',
          destination: `sass/${mode.toLowerCase()}.tokens.scss`,
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
          format: 'json/flat',
          destination: `web/${mode.toLowerCase()}.tokens.json`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    docs: {
      transformGroup: 'web',
      transforms: ['bal/size/rem', 'bal/color/hex', 'bal/css/name'],
      prefix: 'bal',
      buildPath: 'dist/',
      files: [
        {
          format: 'json',
          destination: `docs/${mode.toLowerCase()}.tokens.json`,
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
          format: 'javascript/es6',
          destination: `js/${mode.toLowerCase()}.tokens.js`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
  },
}

export default config
