import { Config } from '@stencil/core'
import { StencilBaseConfig } from './.build/stencil/stencil.basic.config'
import { VueGenerator } from './.build/stencil/stencil.bindings.vue'

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
      dir: 'public',
      copy: [
        { src: 'assets/fonts', warn: true },
        { src: '../../fonts/lib', dest: 'assets/fonts', warn: true },
        { src: '../../components-table/css/design-system-table.css', dest: 'assets/css/design-system-table.css', warn: true },
      ],
    },
    VueGenerator('../../public/build/design-system-components.esm.js', './.storybook/vue/components.ts'),
  ],
}
