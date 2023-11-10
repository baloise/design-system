import { Config } from '@stencil/core'

import { StencilBaseConfig } from './config/stencil.basic.config'
import { CustomDocumentationGenerator } from './config/doc-output-target'

export const config: Config = {
  ...StencilBaseConfig,
  tsconfig: 'tsconfig.docs.json',
  outputTargets: [
    ...(StencilBaseConfig.outputTargets as any),
    /**
     * Library outputs
     */
    {
      type: 'docs-json',
      file: './.tmp/components.json',
    },
    /**
     * Documentation outputs
     */
    CustomDocumentationGenerator,
  ],
}
