import { Config } from '@stencil/core'

import { CustomDocumentationGenerator } from './docs/custom-documentation'
import { StencilBaseConfig } from './config/stencil.basic.config'

export const config: Config = {
  ...StencilBaseConfig,
  outputTargets: [
    ...(StencilBaseConfig.outputTargets as any),
    /**
     * Library outputs
     */
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    /**
     * Documentation outputs
     */
    CustomDocumentationGenerator,
  ],
}
