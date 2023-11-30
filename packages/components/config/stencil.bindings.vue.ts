import { vueOutputTarget } from '@baloise/design-system-output-target-vue'
import { docComponents } from './doc.components'

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

export const VueGenerator = (
  componentCorePackage = '@baloise/design-system-components',
  proxiesFile = '../components-vue/src/generated/proxies.ts',
  excludeComponents = docComponents,
): any =>
  vueOutputTarget({
    includeImportCustomElements: true,
    includeDefineCustomElements: false,
    proxiesFile,
    componentCorePackage,
    componentModels: vueComponentModels,
    excludeComponents,
    customElementsDir: 'dist/components',
  })
