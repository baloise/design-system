import { Config } from '@stencil/core'

import { StencilBaseConfig } from './config/stencil.basic.config'
import { AngularGenerator } from './config/stencil.bindings.angular'
import { VueGenerator } from './config/stencil.bindings.vue'
import { ReactGenerator } from './config/stencil.bindings.react'

export const config: Config = {
  ...StencilBaseConfig,
  extras: {
    initializeNextTick: true,
  },
  outputTargets: [
    ...(StencilBaseConfig.outputTargets as any),
    /**
     * Library outputs
     */
    // {
    //   type: 'docs-json',
    //   file: './public/assets/data/components.json',
    // },
    VueGenerator(),
    AngularGenerator(),
    ReactGenerator(),
    /**
     * Documentation outputs
     */
    // CustomDocumentationGenerator,
    /**
     * Copy assets for E2E testing
     */
    // {
    //   type: 'www',
    //   dir: 'www',
    //   serviceWorker: false,
    //   empty: true,
    //   copy: [
    //     {
    //       src: '**/*.html',
    //     },
    //     {
    //       src: 'components.d.ts',
    //     },
    //     { src: '../../css/css/baloise-design-system.css', dest: 'assets/baloise-design-system.css', warn: true },
    //     { src: '../../fonts/lib', dest: 'assets/fonts', warn: true },
    //     { src: '../public/assets/images', dest: 'assets/images', warn: true },
    //   ],
    // },
  ],
}
