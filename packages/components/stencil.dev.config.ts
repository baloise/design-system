import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil/postcss'
import autoprefixer from 'autoprefixer'
import { ComponentModelConfig, vueOutputTarget } from '@baloise/vue-output-target'

const vueComponentModels: ComponentModelConfig[] = [
  {
    elements: ['bal-radio-group', 'bal-datepicker', 'bal-timeinput', 'bal-select'],
    event: 'balChange',
    targetAttr: 'value',
  },
  {
    elements: ['bal-checkbox'],
    event: 'balChange',
    targetAttr: 'checked',
  },
  {
    elements: ['bal-input', 'bal-textarea', 'bal-slider'],
    event: 'balInput',
    targetAttr: 'value',
  },
  {
    elements: ['bal-accordion', 'bal-dropdown'],
    event: 'balCollapsed',
    targetAttr: 'is-active',
  },
]

export const config: Config = {
  namespace: 'design-system-components',
  globalStyle: 'src/styles/global.scss',
  globalScript: 'src/global.ts',
  enableCache: true,
  plugins: [sass()],
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
      file: 'src/stories/assets/components.json',
    },
    {
      type: 'www',
      dir: 'public',
      copy: [{ src: 'assets/fonts', warn: true }],
    },
    vueOutputTarget({
      componentCorePackage: '../../public/design-system-components/design-system-components.esm',
      proxiesFile: './.storybook/vue/components.ts',
      componentModels: vueComponentModels,
      includeDefineCustomElements: false,
      includePolyfills: false,
    }),
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
    //     {
    //       src: 'assets/fonts',
    //     },
    //   ],
    // },
  ],
}
