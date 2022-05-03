import { ComponentModelConfig, vueOutputTarget } from '@baloise/vue-output-target'
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
  proxiesDir = '../components-vue/src/proxies',
  excludeComponents = docComponents,
) =>
  vueOutputTarget({
    componentCorePackage,
    proxiesDir,
    componentModels: vueComponentModels,
    includeUtils: false,
    excludeComponents,
  })

