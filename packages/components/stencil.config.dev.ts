import { Config } from '@stencil/core'

import { StencilBaseConfig } from './config/stencil.basic.config'
import { VueGenerator } from './config/stencil.bindings.vue'
import { CustomDocumentationGenerator } from './config/doc-output-target'

export const config: Config = {
  ...StencilBaseConfig,
  tsconfig: 'tsconfig.docs.json',
  outputTargets: [
    ...(StencilBaseConfig.outputTargets as any),
    VueGenerator('../../..', './.storybook/vue/generated/components.ts', []),
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
