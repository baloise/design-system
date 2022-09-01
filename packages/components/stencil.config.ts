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
  ],
}
