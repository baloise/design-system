import { DOCUMENT } from '@angular/common'
import { APP_INITIALIZER, NgZone, makeEnvironmentProviders } from '@angular/core'
import type { EnvironmentProviders } from '@angular/core'

import type { BaloiseDesignSystemAngularConfig } from '@baloise/design-system-components-angular/common'
import {
  AngularDelegate,
  BalBreakpointsService,
  BalConfigService,
  BalModalService,
  BalOrientationService,
  BalSnackbarService,
  BalToastService,
  BalTokenBreakpointSubject,
  BalTokenBreakpoints,
  BalTokenConfig,
  BalTokenModal,
  BalTokenSnackbar,
  BalTokenToast,
  BalTokenUserConfig,
  BalTokenDevice,
  BalTokenOrientationSubject,
} from '@baloise/design-system-components-angular/common'

import {
  balBreakpointSubject,
  balBreakpoints,
  balModalController,
  balSnackbarController,
  balToastController,
  attachToConfig,
  defaultConfig,
  detachFromConfig,
  updateBalAllowedLanguages,
  updateBalAnimated,
  updateBalIcons,
  updateBalLanguage,
  updateBalRegion,
  balDevice,
  balOrientationSubject,
} from '@baloise/design-system-components/components'

import { appInitialize } from './app-initialize'

export const provideBaloiseDesignSystem = (config: BaloiseDesignSystemAngularConfig = {}): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: BalTokenUserConfig,
      useValue: config,
    },
    {
      provide: BalTokenConfig,
      useValue: {
        attachToConfig,
        defaultConfig,
        detachFromConfig,
        updateBalAllowedLanguages,
        updateBalAnimated,
        updateBalIcons,
        updateBalLanguage,
        updateBalRegion,
      },
    },
    {
      provide: BalTokenToast,
      useValue: balToastController,
    },
    {
      provide: BalTokenSnackbar,
      useValue: balSnackbarController,
    },
    {
      provide: BalTokenModal,
      useValue: balModalController,
    },
    {
      provide: BalTokenBreakpoints,
      useValue: balBreakpoints,
    },
    {
      provide: BalTokenBreakpointSubject,
      useValue: balBreakpointSubject,
    },
    {
      provide: BalTokenDevice,
      useValue: balDevice,
    },
    {
      provide: BalTokenOrientationSubject,
      useValue: balOrientationSubject,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitialize,
      multi: true,
      deps: [BalTokenUserConfig, DOCUMENT, NgZone],
    },
    AngularDelegate,
    BalBreakpointsService,
    BalConfigService,
    BalModalService,
    BalOrientationService,
    BalSnackbarService,
    BalToastService,
  ])
}
