import { ValueAccessorConfig, angularOutputTarget } from '@baloise/output-target-angular'
import { docComponents } from './doc.components'

export const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: [
      'ds-radio-group',
      'ds-segment',
      'ds-checkbox-group',
      'ds-select',
      'ds-dropdown',
      'ds-date',
      'ds-input-date',
      'ds-file-upload',
    ],
    event: 'dsChange',
    targetAttr: 'value',
    type: 'select',
  },
  {
    elementSelectors: ['ds-checkbox'],
    event: 'dsChange',
    targetAttr: 'checked',
    type: 'boolean',
  },
  {
    elementSelectors: ['ds-number-input', 'ds-input-stepper'],
    event: 'dsInput',
    targetAttr: 'value',
    type: 'number',
  },
  {
    elementSelectors: ['ds-input', 'ds-textarea', 'ds-input-slider', 'ds-time-input'],
    event: 'dsInput',
    targetAttr: 'value',
    type: 'text',
  },
]

export const AngularGenerator = () =>
  angularOutputTarget({
    componentCorePackage: '@baloise/ds-core',
    directivesMetaFile: '../angular/src/generated/meta.ts',
    directivesProxyFile: '../angular/src/generated/proxies.ts',
    directivesArrayFile: '../angular/src/generated/proxies-list.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents: [
      ...docComponents,
      'ds-segment',
      'ds-checkbox-group',
      'ds-checkbox',
      'ds-date',
      'ds-dropdown',
      'ds-file-upload',
      'ds-input-date',
      'ds-input-slider',
      'ds-input-stepper',
      'ds-input',
      'ds-number-input',
      'ds-radio-group',
      'ds-select',
      'ds-textarea',
      'ds-time-input',
    ],
    outputType: 'standalone',
  })
