import { Config } from '@stencil/core'
import { CustomDocumentationGenerator } from './.build/readme/custom-documentation'
import { StencilBaseConfig } from './.build/stencil/stencil.basic.config'
import { AngularGenerator } from './.build/stencil/stencil.bindings.angular'
import { VueGenerator } from './.build/stencil/stencil.bindings.vue'
import { ReactGenerator } from './.build/stencil/stencil.bindings.react'

export const config: Config = {
  ...StencilBaseConfig,
  extras: {
    dynamicImportShim: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: true,
    cloneNodeFix: true,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-json',
      file: './docs/components.raw.json',
    },
    CustomDocumentationGenerator,
    VueGenerator(),
    AngularGenerator(),
    ReactGenerator(),
  ],
}
