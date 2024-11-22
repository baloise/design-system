import { vueOutputTarget } from '@baloise/output-target-vue'

export const vueComponentModels: any[] = [
  {
    elements: ['bal-segment', 'bal-radio-group', 'bal-select', 'bal-tabs', 'bal-input-stepper', 'bal-checkbox-group'],
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
    proxiesFile: '../vue/src/generated/proxies.ts',
    componentCorePackage: '@baloise/ds-core',
    componentModels: vueComponentModels,
    customElementsDir: 'components',
  })
