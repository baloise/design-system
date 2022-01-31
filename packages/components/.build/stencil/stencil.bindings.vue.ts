import { ComponentModelConfig, vueOutputTarget } from '@baloise/vue-output-target'

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
      'bal-checkbox',
    ],
    event: 'balChange',
    targetAttr: 'value',
  },
  {
    elements: ['bal-input', 'bal-textarea', 'bal-slider'],
    event: 'balInput',
    targetAttr: 'value',
  },
]

export const VueGenerator = (
  componentCorePackage = '@baloise/design-system-components',
  proxiesDir = '../components-vue/src/proxies',
  excludeComponents = [
    'bal-app',
    'bal-doc-app',
    'bal-doc-color',
    'bal-doc-download',
    'bal-doc-github',
    'bal-doc-icons',
    'bal-doc-image',
  ],
) =>
  vueOutputTarget({
    componentCorePackage,
    proxiesDir,
    componentModels: vueComponentModels,
    includeUtils: false,
    excludeComponents,
  })
