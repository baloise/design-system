import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil/postcss'
import autoprefixer from 'autoprefixer'

/**
 * Stencil Configurations
 */
export const config: Config = {
  namespace: 'ui-library',
  globalStyle: 'src/styles/ui-library.scss',
  buildEs5: true,
  outputTargets: [
    {
      type: 'www',
      dir: '../../docs',
      serviceWorker: false,
      empty: false,
      copy: [
        {
          src: '**/*.html',
        },
        {
          src: '**/*.md',
        },
        {
          src: 'components.d.ts',
        },
        {
          src: 'assets/fonts',
        },
      ],
    },
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    sass(),
  ],
}
