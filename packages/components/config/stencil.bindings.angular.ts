import { ValueAccessorConfig, angularOutputTarget } from '@baloise/design-system-output-target-angular'
import { docComponents } from './doc.components'

export const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: [
      'bal-radio-group',
      'bal-checkbox-group',
      'bal-select',
      'bal-datepicker',
      'bal-date',
      'bal-input-date',
      'bal-file-upload',
    ],
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
    elementSelectors: ['bal-number-input', 'bal-input-stepper'],
    event: 'balInput',
    targetAttr: 'value',
    type: 'number',
  },
  {
    elementSelectors: ['bal-input', 'bal-textarea', 'bal-input-slider', 'bal-time-input'],
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
    outputType: 'module',
  })

export const AngularStandaloneGenerator = () =>
  angularOutputTarget({
    componentCorePackage: '@baloise/design-system-components',
    directivesProxyFile: '../components-angular/standalone/src/generated/proxies.ts',
    directivesArrayFile: '../components-angular/standalone/src/generated/proxies-list.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents: [...docComponents],
    outputType: 'standalone',
  })

export const AngularLegacyGenerator = () =>
  angularOutputTarget({
    componentCorePackage: '@baloise/design-system-components',
    directivesProxyFile: '../components-angular/legacy/src/generated/proxies.ts',
    directivesArrayFile: '../components-angular/legacy/src/generated/proxies-list.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents: [...docComponents],
    outputType: 'legacy',
  })
