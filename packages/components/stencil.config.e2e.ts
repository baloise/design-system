import { Config } from '@stencil/core'

import { StencilBaseConfig } from './config/stencil.basic.config'

export const config: Config = {
  ...StencilBaseConfig,
  outputTargets: [
    ...(StencilBaseConfig.outputTargets as any),
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
        { src: '../../fonts/src/assets', dest: 'assets/fonts', warn: true },
      ],
    },
  ],
  testing: {
    rootDir: 'src',
    modulePathIgnorePatterns: ['cypress'],
  },
}
