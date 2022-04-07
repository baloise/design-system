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
  excludeComponents = [
    'bal-doc-app',
    'bal-doc-banner',
    'bal-doc-color',
    'bal-doc-download',
    'bal-doc-github',
    'bal-doc-icons',
    'bal-doc-image',
    'bal-doc-shades',
    'bal-doc-support-color',
    'bal-doc-lead',
    'bal-doc-tabs',
    'bal-doc-usage',
    'bal-doc-usage-item',
    'bal-doc-link-list',
    'bal-doc-link-list-item',
    'bal-doc-link-tabs',
    'bal-doc-link-usage',
    'bal-doc-link-usage-item',
  ],
) =>
  vueOutputTarget({
    componentCorePackage,
    proxiesDir,
    componentModels: vueComponentModels,
    includeUtils: false,
    excludeComponents,
  })

