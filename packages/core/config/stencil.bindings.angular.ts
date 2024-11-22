import { ValueAccessorConfig, angularOutputTarget } from '@baloise/output-target-angular'
import { docComponents } from './doc.components'

export const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: [
      'bal-radio-group',
      'bal-segment',
      'bal-checkbox-group',
      'bal-select',
      'bal-dropdown',
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
    componentCorePackage: '@baloise/ds-core',
    directivesMetaFile: '../angular/src/generated/meta.ts',
    directivesProxyFile: '../angular/src/generated/proxies.ts',
    directivesArrayFile: '../angular/src/generated/proxies-list.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents: [
      ...docComponents,
      'bal-segment',
      'bal-checkbox-group',
      'bal-checkbox',
      'bal-date',
      'bal-dropdown',
      'bal-file-upload',
      'bal-input-date',
      'bal-input-slider',
      'bal-input-stepper',
      'bal-input',
      'bal-number-input',
      'bal-radio-group',
      'bal-select',
      'bal-textarea',
      'bal-time-input',
    ],
    outputType: 'standalone',
  })

export const AngularModuleGenerator = () =>
  angularOutputTarget({
    componentCorePackage: '@baloise/ds-core',
    directivesMetaFile: '../angular-module/src/generated/meta.ts',
    directivesProxyFile: '../angular-module/src/generated/proxies.ts',
    directivesArrayFile: '../angular-module/src/generated/proxies-list.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents: [...docComponents],
    outputType: 'module',
  })

export const AngularLegacyGenerator = () =>
  angularOutputTarget({
    componentCorePackage: '@baloise/ds-core',
    directivesMetaFile: '../angular-legacy/src/generated/meta.ts',
    directivesProxyFile: '../angular-legacy/src/generated/proxies.ts',
    directivesArrayFile: '../angular-legacy/src/generated/proxies-list.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents: [...docComponents],
    outputType: 'legacy',
  })
