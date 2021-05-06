import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil/postcss'
import autoprefixer from 'autoprefixer'

import { ComponentModelConfig, vueOutputTarget } from '@baloise/vue-output-target'
import { vue2OutputTarget } from '@baloise/vue-2-output-target'
import { angularOutputTarget, ValueAccessorConfig } from '@baloise/angular-output-target'

/**
 * Vue Component Models
 */
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
    elements: ['bal-input', 'bal-textarea'],
    event: 'balInput',
    targetAttr: 'value',
  },
  {
    elements: ['bal-accordion', 'bal-dropdown'],
    event: 'balCollapsed',
    targetAttr: 'is-active',
  },
]

/**
 * Angular Component Models
 */
const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['bal-radio-group', 'bal-select', 'bal-datepicker', 'bal-timeinput'],
    event: 'balChange',
    targetAttr: 'value',
    type: 'select',
  },
  {
    elementSelectors: ['bal-checkbox'],
    event: 'balChange',
    targetAttr: 'checked',
    type: 'boolean',
  },
  {
    elementSelectors: ['bal-input', 'bal-textarea'],
    event: 'balInput',
    targetAttr: 'value',
    type: 'text',
  },
]

/**
 * Stencil Configurations
 */
export const config: Config = {
  namespace: 'ui-library',
  globalStyle: 'src/styles/ui-library.scss',
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    sass(),
  ],
  buildEs5: true,
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    initializeNextTick: true,
    safari10: true,
    scriptDataOpts: true,
    shadowDomShim: true,
    appendChildSlotFix: true,
    cloneNodeFix: true,
    slotChildNodesFix: true,
  },
  outputTargets: [
    {
      type: 'dist',
      polyfills: true,
      empty: true,
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: './docs/components.raw.json',
    },
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
          src: 'assets/fonts',
        },
      ],
    },
    vue2OutputTarget({
      componentCorePackage: '@baloise/ui-library',
      proxiesFile: '../components-vue-2/src/components.ts',
      componentModels: vueComponentModels,
      includeDefineCustomElements: false,
      includePolyfills: false,
    }),
    vueOutputTarget({
      componentCorePackage: '@baloise/ui-library',
      proxiesFile: '../components-vue/src/components.ts',
      componentModels: vueComponentModels,
      includeDefineCustomElements: false,
      includePolyfills: false,
    }),
    angularOutputTarget({
      componentCorePackage: '@baloise/ui-library',
      directivesProxyFile: '../angular/src/directives/proxies.ts',
      directivesArrayFile: '../angular/src/directives/proxies-list.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
  ],
}
