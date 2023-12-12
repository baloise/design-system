module.exports = {
  source: ['src/**/*.json'],
  platforms: {
    web: {
      transformGroup: 'web',
      transforms: ['attribute/cti', 'color/hex', 'size/remToPx', 'bal/css/name'],
      prefix: 'bal',
      buildPath: 'dist/figma/',
      files: [
        {
          format: 'bal/figma',
          destination: 'color.json',
          filter: 'bal/figma/color',
        },
        {
          format: 'bal/figma',
          destination: 'size.json',
          filter: 'bal/figma/size',
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
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          format: 'css/variables',
          destination: 'tokens.css',
          filter: 'bal/without-deprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'css/variables',
          destination: 'tokens.css.scss',
          filter: 'bal/without-deprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'css/variables',
          destination: 'deprecated/tokens.css',
          filter: 'bal/only-deprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'css/variables',
          destination: 'deprecated/tokens.css.scss',
          filter: 'bal/only-deprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'json',
          destination: 'tokens.docs.json',
          filter: 'bal/without-deprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'json',
          destination: 'deprecated/tokens.docs.json',
          filter: 'bal/only-deprecated',
          options: {
            outputReferences: true,
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
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          format: 'scss/variables',
          destination: 'tokens.scss',
          filter: 'bal/without-deprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'scss/variables',
          destination: 'deprecated/tokens.scss',
          filter: 'bal/only-deprecated',
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
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          format: 'less/variables',
          destination: 'tokens.less',
          filter: 'bal/without-deprecated',
          options: {
            outputReferences: true,
          },
        },
        {
          format: 'less/variables',
          destination: 'deprecated/tokens.less',
          filter: 'bal/only-deprecated',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      transforms: ['attribute/cti', 'name/cti/camel', 'size/rem', 'color/hex', 'bal/css/name', 'bal/size/rem'],
      buildPath: 'dist/',
      prefix: 'bal',
      files: [
        {
          format: 'javascript/es6',
          destination: 'tokens.esm.js',
          filter: 'bal/without-deprecated',
        },
        {
          format: 'typescript/es6-declarations',
          destination: 'types/tokens.d.ts',
          filter: 'bal/without-deprecated',
        },
        {
          format: 'javascript/module-flat',
          destination: 'tokens.js',
          filter: 'bal/without-deprecated',
        },
        {
          format: 'json/flat',
          destination: 'tokens.json',
          filter: 'bal/without-deprecated',
        },
        {
          format: 'json/flat',
          destination: 'deprecated/tokens.json',
          filter: 'bal/only-deprecated',
        },
      ],
    },
  },
}
