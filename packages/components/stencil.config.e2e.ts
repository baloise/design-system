import { Config } from '@stencil/core'

import { StencilBaseConfig } from './config/stencil.basic.config'
import { VueGenerator } from './config/stencil.bindings.vue'

export const config: Config = {
  ...StencilBaseConfig,
  tsconfig: 'tsconfig.docs.json',
  outputTargets: [
    ...(StencilBaseConfig.outputTargets as any),
    VueGenerator('../../..', './.storybook/vue/generated/components.ts', []),
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
        { src: '../../css/css/baloise-design-system.css', dest: 'assets/baloise-design-system.css', warn: true },
        { src: '../../fonts/lib', dest: 'assets/fonts', warn: true },
        { src: '../public/assets/images', dest: 'assets/images', warn: true },
      ],
    },
  ],
  testing: {
    rootDir: 'src',
    modulePathIgnorePatterns: ['cypress'],
  },
}
