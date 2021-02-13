import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil/postcss'
import autoprefixer from 'autoprefixer'

export const config: Config = {
  namespace: 'ui-library',
  globalStyle: 'src/styles/ui-library.scss',
  enableCache: true,
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    sass(),
  ],
  outputTargets: [
    {
      type: 'www',
      dir: 'www',
      serviceWorker: false,
      empty: true,
      copy: [
        {
          src: '**/*.html',
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
}
