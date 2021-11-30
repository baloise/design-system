import { Config } from '@stencil/core'
import { StencilBaseConfig } from './.build/stencil/stencil.basic.config'

export const config: Config = {
  ...StencilBaseConfig,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
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
