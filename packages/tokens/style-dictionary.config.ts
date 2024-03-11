import { Config } from 'style-dictionary'

// If you need to add multiple configutations Config[] is supported
const config: Config | Config[] = {
  source: ['src/**/*.json'],
  platforms: {
    web: {
      transformGroup: 'web',
      transforms: ['attribute/cti', 'color/hex', 'size/remToPx', 'bal/css/name'],
      prefix: 'bal',
      buildPath: 'figma/',
      files: [
        {
          format: 'figma',
          destination: 'color.json',
          filter: 'figmaColor',
        },
        {
          format: 'figma',
          destination: 'size.json',
          filter: 'figmaSize',
        },
      ],
    },
    css: {
      transformGroup: 'css',
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
        'bal/css/name',
        'bal/size/rem',
      ],
      buildPath: '/',
      prefix: 'bal',
      files: [
        {
          format: 'css/variables',
          destination: 'tokens.css',
          filter: 'withoutDeprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'css/variables',
          destination: 'tokens.css.scss',
          filter: 'withoutDeprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'css/variables',
          destination: 'deprecated/tokens.css',
          filter: 'onlyDeprecated',
          options: {
            outputReferences: false,
          },
        },
        {
          format: 'css/variables',
          destination: 'deprecated/tokens.css.scss',
          filter: 'onlyDeprecated',
          options: {
            outputReferences: false,
          },
        },
        {
          format: 'json',
          destination: 'tokens.docs.json',
          filter: 'withoutDeprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'json',
          destination: 'deprecated/tokens.docs.json',
          filter: 'onlyDeprecated',
          options: {
            outputReferences: false,
          },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
        'bal/css/name',
        'bal/size/rem',
      ],
      buildPath: '/',
      prefix: 'bal',
      files: [
        {
          format: 'scss/variables',
          destination: 'tokens.scss',
          filter: 'withoutDeprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'scss/variables',
          destination: 'deprecated/tokens.scss',
          filter: 'onlyDeprecated',
        },
      ],
    },
    less: {
      transformGroup: 'less',
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
        'bal/css/name',
        'bal/size/rem',
      ],
      buildPath: '/',
      prefix: 'bal',
      files: [
        {
          format: 'less/variables',
          destination: 'tokens.less',
          filter: 'withoutDeprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'less/variables',
          destination: 'deprecated/tokens.less',
          filter: 'onlyDeprecated',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      transforms: ['attribute/cti', 'name/cti/camel', 'size/rem', 'color/hex', 'bal/css/name', 'bal/size/rem'],
      buildPath: '/',
      prefix: 'bal',
      files: [
        {
          format: 'javascript/es6',
          destination: 'tokens.esm.js',
          filter: 'withoutDeprecated',
        },
        {
          format: 'typescript/es6-declarations',
          destination: 'types/tokens.d.ts',
          filter: 'withoutDeprecated',
        },
        {
          format: 'javascript/module-flat',
          destination: 'tokens.js',
          filter: 'withoutDeprecated',
        },
        {
          format: 'json/flat',
          destination: 'tokens.json',
          filter: 'withoutDeprecated',
        },
        {
          format: 'json/flat',
          destination: 'deprecated/tokens.json',
          filter: 'onlyDeprecated',
        },
      ],
    },
  },
}

export default config
