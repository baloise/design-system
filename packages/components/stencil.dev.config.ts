import { Config } from '@stencil/core'
import { JsonDocs } from '@stencil/core/internal'
import { sass } from '@stencil/sass'
import { ComponentModelConfig, vueOutputTarget } from '@baloise/vue-output-target'
import { CustomDocumentationGenerator } from './.scripts/readme/custom-documentation'

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
      empty: true,
      copy: [
        { src: 'assets/fonts', warn: true },
        { src: '../../components-table/css/design-system-table.css', warn: true },
      ],
    },
    {
      type: 'docs-custom',
      generator: (docs: JsonDocs) => CustomDocumentationGenerator(docs),
    },
    vueOutputTarget({
      componentCorePackage: '../../public/build/design-system-components.esm.js',
      proxiesFile: './.storybook/vue/components.ts',
      componentModels: vueComponentModels,
      includeDefineCustomElements: false,
      includePolyfills: false,
    }),
  ],
}
