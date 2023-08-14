import { Config } from '@stencil/core'

import { CustomDocumentationGenerator } from './config/doc-output-target'
import { StencilBaseConfig } from './config/stencil.basic.config'

export const config: Config = {
  ...StencilBaseConfig,
  outputTargets: [
    ...(StencilBaseConfig.outputTargets as any),
    /**
     * Library outputs
     */
    {
      type: 'docs-json',
      file: './public/assets/data/components.json',
    },
    /**
     * Documentation outputs
     */
    CustomDocumentationGenerator,
  ],
}
