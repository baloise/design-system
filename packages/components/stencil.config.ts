import { Config } from '@stencil/core'

import { CustomDocumentationGenerator } from './docs/custom-documentation'
import { StencilBaseConfig } from './config/stencil.basic.config'
import { AngularGenerator } from './config/stencil.bindings.angular'
import { VueGenerator } from './config/stencil.bindings.vue'
import { ReactGenerator } from './config/stencil.bindings.react'

export const config: Config = {
  ...StencilBaseConfig,
  buildEs5: 'prod',
  extras: {
    dynamicImportShim: true,
    safari10: false,
    scriptDataOpts: true,
    appendChildSlotFix: true,
    cloneNodeFix: true,
  },
  outputTargets: [
    ...(StencilBaseConfig.outputTargets as any),
    /**
     * Library outputs
     */
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    VueGenerator(),
    AngularGenerator(),
    ReactGenerator(),
    /**
     * Documentation outputs
     */
    CustomDocumentationGenerator,
    {
      type: 'www',
      dir: 'public',
      copy: [
        { src: 'stories/assets/css', dest: 'assets/css', warn: true },
        { src: 'stories/assets/images', dest: 'assets/images', warn: true },
        { src: '../../fonts/lib', dest: 'assets/fonts', warn: true },
        {
          src: '../../components-table/css/design-system-table.css',
          dest: 'assets/css/design-system-table.css',
          warn: true,
        },
        {
          src: '../../fonts/dist/fonts.zip',
          dest: 'assets/download/fonts.zip',
          warn: true,
        },
        {
          src: '../../icons/dist/icons.zip',
          dest: 'assets/download/icons.zip',
          warn: true,
        },
        {
          src: '../../icons/dist/icons.json',
          dest: '../generated/icons.json',
          warn: true,
        },
      ],
    },
  ],
}
