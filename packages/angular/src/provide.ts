import { DOCUMENT } from '@angular/common'
import type { EnvironmentProviders } from '@angular/core'
import { APP_INITIALIZER, NgZone, makeEnvironmentProviders } from '@angular/core'

import {
  attachToConfig,
  balBreakpointSubject,
  balBreakpoints,
  balDevice,
  balModalController,
  balOrientationSubject,
  balSnackbarController,
  balToastController,
  defaultConfig,
  detachFromConfig,
  updateBalAllowedLanguages,
  updateBalAnimated,
  updateBalIcons,
  updateBalLanguage,
  updateBalRegion,
} from '@baloise/ds-core/components'

import { appInitialize } from './app-initialize'
import { AngularDelegate } from './providers/angular-delegate'
import { BalBreakpointsService } from './providers/breakpoints.service'
import { BalConfigService } from './providers/config.service'
import { BalModalService } from './providers/modal.service'
import { BalOrientationService } from './providers/orientation.service'
import { BalSnackbarService } from './providers/snackbar.service'
import { BalToastService } from './providers/toast.service'
import { BaloiseDesignSystemAngularConfig } from './utils/config'
import {
  BalTokenBreakpointSubject,
  BalTokenBreakpoints,
  BalTokenConfig,
  BalTokenDevice,
  BalTokenModal,
  BalTokenOrientationSubject,
  BalTokenSnackbar,
  BalTokenToast,
  BalTokenUserConfig,
} from './utils/token'

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
