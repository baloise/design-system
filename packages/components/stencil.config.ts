import { Config } from '@stencil/core'
import { CustomDocumentationGenerator } from './.build/readme/custom-documentation'
import { StencilBaseConfig } from './.build/stencil/stencil.basic.config'
import { AngularGenerator } from './.build/stencil/stencil.bindings.angular'
import { VueGenerator } from './.build/stencil/stencil.bindings.vue'
import { ReactGenerator } from './.build/stencil/stencil.bindings.react'

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
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-json',
      file: './generated/components.json',
    },
    CustomDocumentationGenerator,
    VueGenerator(),
    AngularGenerator(),
    ReactGenerator(),
  ],
}
