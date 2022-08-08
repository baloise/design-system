import { Config } from '@stencil/core'
import { CustomDocumentationGenerator } from './.build/readme/custom-documentation'
import { StencilBaseConfig } from './.build/stencil/stencil.basic.config'
import { VueGenerator } from './.build/stencil/stencil.bindings.vue'

export const config: Config = {
  ...StencilBaseConfig,
  enableCache: true,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-json',
      file: './generated/components.json',
    },
    CustomDocumentationGenerator,
    VueGenerator('../..', './.storybook/vue/components.ts', []),
    {
      type: 'www',
      dir: 'public',
      copy: [
        { src: 'stories/assets/css', dest: 'assets/css', warn: true },
        { src: 'stories/assets/images', dest: 'assets/images', warn: true },
        { src: '../../fonts/lib', dest: 'assets/fonts', warn: true },
        {
          src: '../../fonts/generated/fonts.zip',
          dest: 'assets/download/fonts.zip',
          warn: true,
        },
        {
          src: '../../icons/generated/icons.zip',
          dest: 'assets/download/icons.zip',
          warn: true,
        },
        {
          src: '../../icons/generated/icons.json',
          dest: '../generated/icons.json',
          warn: true,
        },
      ],
    },
  ],
}
