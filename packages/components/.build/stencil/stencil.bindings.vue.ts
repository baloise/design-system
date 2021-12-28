import { ComponentModelConfig, vueOutputTarget } from '@baloise/vue-output-target'

export const vueComponentModels: ComponentModelConfig[] = [
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

export const VueGenerator = (
  componentCorePackage = '@baloise/design-system-next-components',
  proxiesFile = '../components-vue/src/components.ts',
  includeDefineCustomElements = false,
) =>
  vueOutputTarget({
    componentCorePackage,
    proxiesFile,
    componentModels: vueComponentModels,
    customElementsDir: '../../loader',
    includeDefineCustomElements,
    includePolyfills: false,
    includeUtils: false,
  })
