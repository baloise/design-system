import { Config } from 'style-dictionary'

const basePxFontSize = 16
const mode = 'Base'

const config: Config = {
  source: [`tokens/${mode}.tokens.json`],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['ds/css/name', 'ds/color/rgba', 'ds/size/round', 'ds/size/rem'],
      basePxFontSize,
      buildPath: 'dist/',
      prefix: 'ds',
      files: [
        {
          format: 'ds/css/variables-responsive',
          destination: `css/${mode.toLowerCase()}.tokens.css`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    scss: {
      transformGroup: 'scss',
      transforms: ['ds/css/name', 'ds/color/rgba', 'ds/size/round', 'ds/size/rem'],
      basePxFontSize,
      buildPath: 'dist/',
      prefix: 'ds',
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
      transforms: ['ds/css/name', 'ds/color/hex', 'ds/size/rem'],
      prefix: 'ds',
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
      transforms: ['ds/css/name', 'ds/color/hex', 'ds/size/rem'],
      prefix: 'ds',
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
      transforms: ['ds/js/name', 'ds/color/hex', 'ds/size/round'],
      prefix: 'ds',
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
