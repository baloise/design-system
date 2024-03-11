import { vueOutputTarget } from '@baloise/design-system-output-target-vue'

export const vueComponentModels: any[] = [
  {
    elements: [
      'bal-radio-group',
      'bal-datepicker',
      'bal-select',
      'bal-tabs',
      'bal-input-stepper',
      'bal-checkbox-group',
    ],
    event: 'balChange',
    targetAttr: 'value',
  },
  {
    elements: ['bal-checkbox'],
    event: 'balChange',
    targetAttr: 'checked',
  },
  {
    elements: ['bal-input', 'bal-number-input', 'bal-textarea', 'bal-input-slider'],
    event: 'balInput',
    targetAttr: 'value',
  },
]

export const VueGenerator = (): any =>
  vueOutputTarget({
    includeImportCustomElements: true,
    includeDefineCustomElements: false,
    includeInternalComponents: false,
    proxiesFile: '../components-vue/src/generated/proxies.ts',
    componentCorePackage: '@baloise/design-system-components',
    componentModels: vueComponentModels,
    customElementsDir: 'components',
  })

export const VueTestGenerator = (): any =>
  vueOutputTarget({
    includeImportCustomElements: true,
    includeDefineCustomElements: false,
    includeInternalComponents: true,
    proxiesFile: '../../test/generated/vue-components/index.ts',
    componentCorePackage: '../',
    componentModels: vueComponentModels,
    customElementsDir: 'components',
  })
