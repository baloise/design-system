import { Config } from '@stencil/core'

import { CustomDocumentationGenerator } from './config/doc-output-target'
import { StencilBaseConfig } from './config/stencil.basic.config'

export const config: Config = {
  ...StencilBaseConfig,
  outputTargets: [
    /**
     * Library outputs
     */
    {
      type: 'docs-json',
      file: './.tmp/components.json',
    },
    {
      type: 'www',
      dir: '../../docs/public',
      serviceWorker: false,
      empty: false,
    },
    /**
     * Documentation outputs
     */
    CustomDocumentationGenerator,
  ],
}
