import { EnvironmentProviders, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core'
import {
  attachToConfig,
  detachFromConfig,
  dsBreakpoints,
  dsBreakpointSubject,
  dsDevice,
  dsOrientationSubject,
  initializeDesignSystem,
  updateDsAllowedLanguages,
  updateDsAnimated,
  updateDsIcons,
  updateDsLanguage,
  updateDsRegion,
} from '@helvetia-design/core'
import type { DsConfig } from '@helvetia-design/core'
import { DsBreakpointsService } from './providers/breakpoints.service'
import { DsConfigService } from './providers/config.service'
import { DsOrientationService } from './providers/orientation.service'
import {
  DsTokenBreakpoints,
  DsTokenBreakpointSubject,
  DsTokenConfig,
  DsTokenDevice,
  DsTokenOrientationSubject,
} from './utils/token'

export interface DsAngularConfig {
  defaults?: DsConfig
}

export function bootstrapDesignSystem(config: DsAngularConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: DsTokenBreakpoints, useValue: dsBreakpoints },
    { provide: DsTokenBreakpointSubject, useValue: dsBreakpointSubject },
    { provide: DsTokenDevice, useValue: dsDevice },
    { provide: DsTokenOrientationSubject, useValue: dsOrientationSubject },
    {
      provide: DsTokenConfig,
      useValue: {
        attachToConfig,
        detachFromConfig,
        updateDsLanguage,
        updateDsRegion,
        updateDsAnimated,
        updateDsIcons,
        updateDsAllowedLanguages,
      },
    },
    DsBreakpointsService,
    DsOrientationService,
    DsConfigService,
    provideEnvironmentInitializer(() => {
      initializeDesignSystem({ ...config.defaults })
    }),
  ])
}

export { DsBreakpointsService } from './providers/breakpoints.service'
export { DsOrientationService } from './providers/orientation.service'
export { DsConfigService } from './providers/config.service'
export {
  DsTokenBreakpoints,
  DsTokenBreakpointSubject,
  DsTokenConfig,
  DsTokenDevice,
  DsTokenOrientationSubject,
} from './utils/token'
export type { DsConfigUtils } from './utils/token'

// A named export (e.g. `DsInput` below) always wins over a colliding `export *` regardless of statement
// order, so this override doesn't depend on where it's placed relative to './generated/proxies' — it's
// listed after purely for readability, to read as "the generated proxies, then their overrides".
export * from './generated/proxies'
export * from './forms/value-accessor'
export { DsInput } from './forms/ds-input'
export { DsTextarea } from './forms/ds-textarea'
export { DsNumberInput } from './forms/ds-number-input'
export { DsSlider } from './forms/ds-slider'
export { DsCounter } from './forms/ds-counter'
export { DsSegment } from './forms/ds-segment'
export { DsDatepicker } from './forms/ds-datepicker'
export { DsCheckboxGroup } from './forms/ds-checkbox-group'
export { DsRadioGroup } from './forms/ds-radio-group'
export { DsFileUpload } from './forms/ds-file-upload'
export { DsSelect } from './forms/ds-select'
export { DsToggle } from './forms/ds-toggle'
export { DsPhoneInput } from './forms/ds-phone-input'
export { DsModalService } from './providers/modal.service'
export { DsModalRef } from './providers/modal-ref'
export { DS_MODAL_DATA } from './providers/modal.tokens'
export { AngularDelegate } from './providers/angular-delegate'
