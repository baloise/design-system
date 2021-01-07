import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil/postcss'
import autoprefixer from 'autoprefixer'
import { ComponentModelConfig, vueOutputTarget } from 'hirsch-vue-output-target'
import { angularOutputTarget, ValueAccessorConfig } from 'hirsch-angular-output-target'

/**
 * Vue Component Models
 */
const vueComponentModels: ComponentModelConfig[] = [
  {
    elements: ['bal-radio-group', 'bal-datepicker', 'bal-timeinput'],
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
  outputTargets: [
    {
      type: 'dist',
      polyfills: true,
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      dir: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: '**/*.html',
        },
        {
          src: 'components.d.ts',
        },
      ],
    },
    vueOutputTarget({
      componentCorePackage: '@baloise/ui-library',
      proxiesFile: '../vue/src/components.ts',
      componentModels: vueComponentModels,
      includeDefineCustomElements: false,
      includePolyfills: false,
    }) as any,
    angularOutputTarget({
      componentCorePackage: '@baloise/ui-library',
      directivesProxyFile: '../angular/src/directives/proxies.ts',
      directivesArrayFile: '../angular/src/directives/proxies-list.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    sass(),
  ],
}
