import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil/postcss'
import autoprefixer from 'autoprefixer'

import { ComponentModelConfig, vueOutputTarget } from '@baloise/vue-output-target'
import { angularOutputTarget, ValueAccessorConfig } from '@baloise/angular-output-target'
import { reactOutputTarget } from '@stencil/react-output-target'

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
    elementSelectors: ['bal-input', 'bal-textarea', 'bal-slider'],
    event: 'balInput',
    targetAttr: 'value',
    type: 'text',
  },
]

/**
 * Stencil Configurations
 */
export const config: Config = {
  namespace: 'design-system-components',
  globalStyle: 'src/styles/global.scss',
  globalScript: 'src/global.ts',
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    sass(),
  ],
  extras: {
    dynamicImportShim: true,
    initializeNextTick: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: true,
    cloneNodeFix: true,
  },
  outputTargets: [
    {
      type: 'dist',
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
    vueOutputTarget({
      componentCorePackage: '@baloise/design-system-components',
      proxiesFile: '../components-vue/src/components.ts',
      componentModels: vueComponentModels,
      includeDefineCustomElements: false,
      includePolyfills: false,
    }),
    angularOutputTarget({
      componentCorePackage: '@baloise/design-system-components',
      directivesProxyFile: '../components-angular/src/directives/proxies.ts',
      directivesArrayFile: '../components-angular/src/directives/proxies-list.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    reactOutputTarget({
      componentCorePackage: '@baloise/design-system-components',
      proxiesFile: '../components-react/src/components.ts',
      includeDefineCustomElements: false,
    }),
  ],
}
