// import { Config } from '@stencil/core'
// import { resolve } from 'path'
// import fg from 'fast-glob'
// import { StencilBaseConfig } from './.build/stencil/stencil.basic.config'
// import { VueGenerator } from './.build/stencil/stencil.bindings.vue'

// export const config: Config = {
//   ...StencilBaseConfig,
//   enableCache: true,
//   outputTargets: [
//     {
//       type: 'dist-custom-elements',
//     },
//     {
//       type: 'docs-json',
//       file: './generated/components.json',
//     },
//     VueGenerator('../..', './.storybook/vue/components.ts', []),
//   ],
//   rollupPlugins: {
//     before: [
//       {
//         name: 'watch-external',
//         async buildStart() {
//           const styleFiles = await fg(resolve(__dirname, './src/styles/**/*.sass'))
//           for (const file of styleFiles) {
//             this.addWatchFile(file)
//           }
//         },
//       },
//     ],
//   },
// }

import { Config } from '@stencil/core'

import { StencilBaseConfig } from './config/stencil.basic.config'

export const config: Config = {
  ...StencilBaseConfig,
}
