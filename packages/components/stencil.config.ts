import { Config } from '@stencil/core'

import { StencilBaseConfig } from './config/stencil.basic.config'
import { AngularGenerator, AngularLegacyGenerator, AngularStandaloneGenerator } from './config/stencil.bindings.angular'
import { VueGenerator } from './config/stencil.bindings.vue'
import { ReactGenerator } from './config/stencil.bindings.react'

export const config: Config = {
  ...StencilBaseConfig,
  extras: {
    initializeNextTick: true,
  },
  outputTargets: [
    ...(StencilBaseConfig.outputTargets as any),
    {
      type: 'docs-vscode',
      file: 'dist/html.html-data.json',
      sourceCodeBaseUrl: 'https://github.com/baloise/design-system',
    },
    {
      type: 'dist-hydrate-script',
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      copy: [
        {
          src: '../config/custom-elements',
          dest: 'components',
          warn: true,
        },
      ],
      includeGlobalScripts: false,
    },
    /**
     * Library outputs
     */
    {
      type: 'docs-json',
      file: './.tmp/components.json',
    },
    VueGenerator(),
    AngularGenerator(),
    AngularStandaloneGenerator(),
    AngularLegacyGenerator(),
    ReactGenerator(),
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
        {
          src: '../../css/css/theme-compact.css',
          dest: 'assets/theme-compact.css',
        },
        { src: '../../css/css/baloise-design-system.css', dest: 'assets/baloise-design-system.css', warn: true },
        { src: '../../fonts/lib', dest: 'assets/fonts', warn: true },
      ],
    },
  ],
}
