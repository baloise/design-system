import { Config } from '@stencil/core'

import { CustomDocumentationGenerator } from './config/doc-output-target'
import { StencilBaseConfig } from './config/stencil.basic.config'
import { AngularGenerator } from './config/stencil.bindings.angular'
import { VueGenerator } from './config/stencil.bindings.vue'
import { ReactGenerator } from './config/stencil.bindings.react'

export const config: Config = {
  ...StencilBaseConfig,
  buildEs5: 'prod',
  extras: {
    initializeNextTick: true,
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
    /**
     * Copy assets for E2E testing
     */
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
        { src: '../public/assets/images', dest: 'assets/images', warn: true },
      ],
    },
  ],
}
