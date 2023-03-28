import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
  namespace: 'design-system-components',
  enableCache: true,
  watchIgnoredRegex: [/\.stories\.(js|jsx|ts|tsx|mdx)$/, /\/stories\//], // ignore storybook files in --watch mode
  invisiblePrehydration: false,
  sourceMap: false,
  buildEs5: 'prod',
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: [`${__dirname.split('/packages/')[0]}/node_modules/`, 'node_modules/'],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
  ],
}
