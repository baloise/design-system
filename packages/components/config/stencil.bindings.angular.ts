import { ValueAccessorConfig, angularOutputTarget } from '@baloise/design-system-output-target-angular'
import { docComponents } from './doc.components'

export const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['bal-radio-group', 'bal-checkbox-group', 'bal-select', 'bal-datepicker'],
    event: 'balChange',
    targetAttr: 'value',
    type: 'select',
  },
  {
    elementSelectors: ['bal-checkbox'],
    event: 'balChange',
    targetAttr: 'value',
    type: 'boolean',
  },
  {
    elementSelectors: ['bal-number-input', 'bal-input-stepper'],
    event: 'balInput',
    targetAttr: 'value',
    type: 'number',
  },
  {
    elementSelectors: ['bal-input', 'bal-textarea', 'bal-input-slider'],
    event: 'balInput',
    targetAttr: 'value',
    type: 'text',
  },
]

export const AngularGenerator = () =>
  angularOutputTarget({
    componentCorePackage: '@baloise/design-system-components',
    directivesProxyFile: '../components-angular/src/generated/proxies.ts',
    directivesArrayFile: '../components-angular/src/generated/proxies-list.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents: [...docComponents],
  })
