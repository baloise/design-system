import { ComponentModelConfig, vueOutputTarget } from '@baloise/design-system-next-output-target-vue'
import { docComponents } from './doc.components'

export const vueComponentModels: ComponentModelConfig[] = [
  {
    elements: [
      'bal-radio-group',
      'bal-datepicker',
      'bal-timeinput',
      'bal-select',
      'bal-accordion',
      'bal-popover',
      'bal-tabs',
      'bal-input-stepper',
      'bal-checkbox-group',
    ],
    event: 'balChange',
    targetAttr: 'value',
  },
  {
    elements: [
      'bal-checkbox',
    ],
    event: 'balChange',
    targetAttr: 'checked',
  },
  {
    elements: ['bal-input', 'bal-number-input', 'bal-textarea', 'bal-slider'],
    event: 'balInput',
    targetAttr: 'value',
  },
]

export const VueGenerator = (
  componentCorePackage = '@baloise/design-system-next-components',
  proxiesFile = '../components-vue/src/proxies.ts',
  excludeComponents = docComponents,
) =>
  vueOutputTarget({
    includeImportCustomElements: true,
    includePolyfills: false,
    includeDefineCustomElements: false,
    proxiesFile,
    componentCorePackage,
    componentModels: vueComponentModels,
    excludeComponents,
    customElementsDir: 'dist/components'
  })

