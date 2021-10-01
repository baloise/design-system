import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil/postcss'
import autoprefixer from 'autoprefixer'

/**
 * Stencil Configurations
 */
export const config: Config = {
  namespace: 'design-system-components',
  globalStyle: 'src/styles/global.scss',
  globalScript: 'src/global.ts',
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    sass(),
  ],
  extras: {
    dynamicImportShim: true,
    initializeNextTick: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: true,
    cloneNodeFix: true,
  },
  outputTargets: [
    {
      type: 'dist',
      empty: true,
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: './docs/components.raw.json',
    },
  ],
}
