import { Config } from '@stencil/core'
import { StencilBaseConfig } from './.build/stencil/stencil.basic.config'
import { VueGenerator } from './.build/stencil/stencil.bindings.vue'

export const config: Config = {
  ...StencilBaseConfig,
  testing: {
    rootDir: 'src',
    modulePathIgnorePatterns: ['cypress'],
  },
  outputTargets: [
    VueGenerator('../..', './.storybook/vue/components.ts', []),
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
        { src: '../../fonts/lib', dest: 'assets/fonts', warn: true },
      ],
    },
  ],
}
